import { Injectable, OnModuleInit, OnModuleDestroy, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { Observable, Subject, catchError, finalize, from, of } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';
import { OrderEvent, OrderEventType } from '../../domain/order-events.port';

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  ssl?: boolean;
  sasl?: {
    mechanism: string;
    username: string;
    password: string;
  };
  retry?: {
    initialRetryTime: number;
    retries: number;
  };
}

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private kafka: Kafka;
  private consumer: Consumer;
  private readonly eventSubject = new Subject<OrderEvent>();
  private isConnected = false;
  private readonly topicName: string;
  private readonly groupId: string;

  constructor(
    @Inject('KAFKA_CONFIG') private readonly kafkaConfig: KafkaConfig,
    private readonly configService: ConfigService,
  ) {
    this.topicName = configService.get<string>('KAFKA_TOPIC', 'order-events');
    this.groupId = configService.get<string>('KAFKA_GROUP_ID', 'order-tracking-group');
  }

  async onModuleInit(): Promise<void> {
    this.kafka = new Kafka({
      clientId: this.kafkaConfig.clientId,
      brokers: this.kafkaConfig.brokers,
      ssl: this.kafkaConfig.ssl,
      sasl: this.kafkaConfig.sasl,
      retry: this.kafkaConfig.retry,
    });

    this.consumer = this.kafka.consumer({ groupId: this.groupId });
    
    try {
      await this.consumer.connect();
      this.isConnected = true;
      this.logger.log(`Connected to Kafka broker: ${this.kafkaConfig.brokers.join(', ')}`);
      
      await this.consumer.subscribe({ topic: this.topicName, fromBeginning: false });
      this.logger.log(`Subscribed to topic: ${this.topicName}`);
      
      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          await this.handleMessage(payload);
        },
      });
    } catch (error) {
      this.logger.error(`Failed to initialize Kafka consumer: ${error.message}`, error.stack);
      this.isConnected = false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      if (this.consumer) {
        await this.consumer.disconnect();
        this.logger.log('Kafka consumer disconnected successfully');
      }
    } catch (error) {
      this.logger.error(`Error disconnecting Kafka consumer: ${error.message}`, error.stack);
    }
  }

  private async handleMessage(payload: EachMessagePayload): Promise<void> {
    const { topic, partition, message } = payload;
    
    if (!message.value) {
      this.logger.warn(`Received empty message on ${topic}[${partition}]`);
      return;
    }

    try {
      const eventData = JSON.parse(message.value.toString());
      const orderEvent: OrderEvent = {
        id: message.key?.toString() || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: this.mapEventType(eventData.type),
        orderId: eventData.orderId,
        order: eventData.order,
        timestamp: new Date(eventData.timestamp || message.timestamp),
        metadata: {
          topic,
          partition,
          offset: message.offset,
        },
      };

      this.eventSubject.next(orderEvent);
      this.logger.debug(`Processed event: ${orderEvent.type} for order ${orderEvent.orderId}`);
    } catch (error) {
      this.logger.error(`Failed to process message: ${error.message}`, error.stack);
    }
  }

  private mapEventType(type: string): OrderEventType {
    const typeMapping: Record<string, OrderEventType> = {
      'ORDER_CREATED': OrderEventType.ORDER_CREATED,
      'ORDER_UPDATED': OrderEventType.ORDER_UPDATED,
      'ORDER_CANCELLED': OrderEventType.ORDER_CANCELLED,
      'ORDER_COMPLETED': OrderEventType.ORDER_COMPLETED,
      'ORDER_STATUS_CHANGED': OrderEventType.ORDER_STATUS_CHANGED,
    };
    return typeMapping[type] || OrderEventType.ORDER_UPDATED;
  }

  getOrderEvents(): Observable<OrderEvent> {
    return this.eventSubject.asObservable().pipe(
      tap(event => this.logger.debug(`Emitting event: ${event.type}`)),
      share(),
    );
  }

  getConnectionStatus(): { connected: boolean; topic: string; groupId: string } {
    return {
      connected: this.isConnected,
      topic: this.topicName,
      groupId: this.groupId,
    };
  }

  async reconnect(): Promise<boolean> {
    try {
      if (this.consumer) {
        await this.consumer.disconnect();
      }
      
      this.consumer = this.kafka.consumer({ groupId: this.groupId });
      await this.consumer.connect();
      this.isConnected = true;
      
      await this.consumer.subscribe({ topic: this.topicName, fromBeginning: false });
      
      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          await this.handleMessage(payload);
        },
      });
      
      this.logger.log('Kafka consumer reconnected successfully');
      return true;
    } catch (error) {
      this.logger.error(`Failed to reconnect: ${error.message}`, error.stack);
      this.isConnected = false;
      return false;
    }
  }
}