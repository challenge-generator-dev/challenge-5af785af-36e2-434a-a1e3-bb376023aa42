import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';
import { OrderEventsController } from './infrastructure/controllers/order-events.controller';
import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { KafkaConfig } from './config/kafka.config';
import { OrderEventsService } from './application/order-events.service';
import { OrderEventsPort } from './domain/order-events.port';
import { KafkaConsumerService } from './infrastructure/kafka/kafka-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [() => ({
        KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'order-tracking-system',
        KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'order-tracking-consumer-group',
        KAFKA_TOPIC: process.env.KAFKA_TOPIC || 'order-events',
        PORT: parseInt(process.env.PORT || '3000', 10),
      })],
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      verboseMemoryLeak: true,
    }),
    KafkaModule,
  ],
  controllers: [OrderEventsController],
  providers: [
    OrderEventsService,
    {
      provide: OrderEventsPort,
      useExisting: KafkaConsumerService,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: KafkaConfig,
      useFactory: (configService: ConfigService) => {
        return {
          broker: configService.get<string>('KAFKA_BROKER'),
          clientId: configService.get<string>('KAFKA_CLIENT_ID'),
          groupId: configService.get<string>('KAFKA_GROUP_ID'),
          topics: [configService.get<string>('KAFKA_TOPIC')],
        };
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}