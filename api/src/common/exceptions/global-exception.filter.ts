import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Kafka } from 'kafkajs';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  details?: unknown;
}

export class KafkaConnectionError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = 'KafkaConnectionError';
  }
}

export class KafkaConsumerError extends Error {
  constructor(message: string, public readonly topic?: string) {
    super(message);
    this.name = 'KafkaConsumerError';
  }
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = new Logger(GlobalExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp.message as string) || message;
        error = (resp.error as string) || error;
        details = resp.details;
      }
    } else if (exception instanceof KafkaConnectionError) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Kafka broker unavailable';
      error = 'Service Unavailable';
      details = {
        service: 'kafka',
        reason: 'Unable to connect to Kafka broker',
        originalError: exception.originalError?.message,
      };
      this.logger.error(
        `Kafka connection failed: ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof KafkaConsumerError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = `Kafka consumer error: ${exception.message}`;
      error = 'Kafka Consumer Error';
      details = {
        topic: exception.topic,
      };
      this.logger.error(
        `Kafka consumer error: ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof Error) {
      message = exception.message;
      
      if (exception.name === 'KafkaJSConnectionError' || exception.message.includes('connect ECONNREFUSED')) {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Kafka broker is not reachable';
        error = 'Service Unavailable';
        details = {
          service: 'kafka',
          reason: 'Connection refused',
        };
      } else if (exception.name === 'KafkaJSBrokerNotAvailable') {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Kafka broker not available';
        error = 'Service Unavailable';
      }
      
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (details) {
      errorResponse.details = details;
    }

    response.status(status).json(errorResponse);
  }
}