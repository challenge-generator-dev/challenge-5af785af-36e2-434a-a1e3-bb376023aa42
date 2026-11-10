import { Controller, Get, Res, HttpStatus, Logger, Header } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { KafkaConsumerService } from '../kafka/kafka-consumer.service';
import { OrderEvent } from '../../domain/order-events.port';

@Controller('order-events')
export class OrderEventsController {
  private readonly logger = new Logger(OrderEventsController.name);

  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {}

  @Get()
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @Header('X-Accel-Buffering', 'no')
  getOrderEvents(@Res() res: Response): void {
    const connectionStatus = this.kafkaConsumerService.getConnectionStatus();
    
    this.logger.log(`SSE connection established. Kafka connected: ${connectionStatus.connected}`);
    
    if (!connectionStatus.connected) {
      this.sendSSEEvent(res, {
        id: `error-${Date.now()}`,
        type: 'CONNECTION_ERROR',
        orderId: 'system',
        order: null,
        timestamp: new Date(),
        metadata: {
          message: 'Kafka consumer is not connected. Please check Kafka broker availability.',
          topic: connectionStatus.topic,
          groupId: connectionStatus.groupId,
        },
      });
    }

    const heartbeatInterval = setInterval(() => {
      this.sendSSEEvent(res, {
        id: `heartbeat-${Date.now()}`,
        type: 'HEARTBEAT',
        orderId: 'system',
        order: null,
        timestamp: new Date(),
        metadata: { connected: connectionStatus.connected },
      });
    }, 30000);

    const subscription = this.kafkaConsumerService.getOrderEvents().subscribe({
      next: (event: OrderEvent) => {
        this.sendSSEEvent(res, event);
      },
      error: (error: Error) => {
        this.logger.error(`Stream error: ${error.message}`);
        this.sendSSEEvent(res, {
          id: `error-${Date.now()}`,
          type: 'STREAM_ERROR',
          orderId: 'system',
          order: null,
          timestamp: new Date(),
          metadata: { message: error.message },
        });
      },
      complete: () => {
        this.logger.log('Event stream completed');
        clearInterval(heartbeatInterval);
        res.end();
      },
    });

    res.on('close', () => {
      this.logger.log('Client disconnected from SSE');
      clearInterval(heartbeatInterval);
      subscription.unsubscribe();
    });
  }

  private sendSSEEvent(res: Response, event: OrderEvent): void {
    const sseData = `id: ${event.id}\n` +
      `type: ${event.type}\n` +
      `orderId: ${event.orderId}\n` +
      `data: ${JSON.stringify(event)}\n\n`;
    
    res.write(sseData);
  }
}