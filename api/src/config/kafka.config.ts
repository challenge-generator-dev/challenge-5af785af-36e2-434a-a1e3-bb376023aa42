import { registerAs } from '@nestjs/config';

export interface KafkaConfig {
  brokers: string[];
  groupId: string;
  clientId: string;
  topics: {
    orderEvents: string;
  };
  retry: {
    initialRetryTime: number;
    retries: number;
  };
}

export const kafkaConfig = registerAs('kafka', (): KafkaConfig => {
  const brokersEnv = process.env.KAFKA_BROKERS || 'localhost:9092';
  const brokers = brokersEnv.split(',').map(b => b.trim());

  return {
    brokers,
    groupId: process.env.KAFKA_GROUP_ID || 'order-tracking-group',
    clientId: process.env.KAFKA_CLIENT_ID || 'order-tracking-client',
    topics: {
      orderEvents: process.env.KAFKA_TOPIC_ORDER_EVENTS || 'order-events',
    },
    retry: {
      initialRetryTime: parseInt(process.env.KAFKA_RETRY_TIME || '1000', 10),
      retries: parseInt(process.env.KAFKA_RETRY_ATTEMPTS || '8', 10),
    },
  };
});

export const KAFKA_CONFIG_TOKEN = 'KAFKA_CONFIG';