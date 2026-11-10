import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaConsumerService } from './kafka-consumer.service';

@Global()
@Module({
  providers: [
    {
      provide: 'KAFKA_CONFIG',
      useFactory: (configService: ConfigService) => ({
        clientId: configService.get<string>('KAFKA_CLIENT_ID', 'order-tracking-system'),
        brokers: [
          configService.get<string>('KAFKA_BROKER', 'localhost:9092')
        ],
        ssl: configService.get<boolean>('KAFKA_SSL', false),
        sasl: configService.get<boolean>('KAFKA_SASL', false) ? {
          mechanism: configService.get<string>('KAFKA_SASL_MECHANISM', 'plain'),
          username: configService.get<string>('KAFKA_SASL_USERNAME', ''),
          password: configService.get<string>('KAFKA_SASL_PASSWORD', ''),
        } : undefined,
        retry: {
          initialRetryTime: 100,
          retries: 8,
        },
      }),
      inject: [ConfigService],
    },
    KafkaConsumerService,
  ],
  exports: [KafkaConsumerService],
})
export class KafkaModule {}