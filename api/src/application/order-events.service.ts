import { Injectable, Logger, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { Subject, Observable, filter, map, catchError, finalize, takeUntil } from 'rxjs';
import { OrderEventsPort, OrderEventType, OrderEvent } from '../domain/order-events.port';
import { Order, OrderStatus } from '../domain/order.entity';

interface StreamEvent {
  type: string;
  orderId: string;
  timestamp: string;
  data: Record<string, unknown>;
}

@Injectable()
export class OrderEventsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrderEventsService.name);
  private readonly eventSubject = new Subject<StreamEvent>();
  private readonly destroy$ = new Subject<void>();
  private isConnected = false;
  private connectionAttempts = 0;
  private readonly maxRetries = 5;

  constructor(
    @Inject(OrderEventsPort)
    private readonly orderEventsPort: OrderEventsPort,
  ) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Inicializando OrderEventsService');
    await this.initializeConnection();
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Cerrando OrderEventsService');
    this.destroy$.next();
    this.destroy$.complete();
    this.eventSubject.complete();
  }

  private async initializeConnection(): Promise<void> {
    try {
      this.connectionAttempts++;
      this.logger.debug(`Intento de conexión #${this.connectionAttempts}`);
      
      const events$ = this.orderEventsPort.getOrderEvents();
      
      events$
        .pipe(
          takeUntil(this.destroy$),
          filter((event) => event !== null && event !== undefined),
          map((event) => this.transformToStreamEvent(event)),
          catchError((error) => {
            this.logger.error('Error en stream de eventos', error);
            this.isConnected = false;
            return this.handleConnectionError(error);
          }),
          finalize(() => {
            this.logger.warn('Stream de eventos finalizado');
            this.isConnected = false;
          })
        )
        .subscribe({
          next: (streamEvent) => {
            if (streamEvent) {
              this.eventSubject.next(streamEvent);
              this.logger.debug(`Evento procesado: ${streamEvent.type}`);
            }
          },
          error: (error) => {
            this.logger.error(`Error en suscripción: ${error.message}`);
            this.isConnected = false;
          },
          complete: () => {
            this.logger.log('Suscripción completada');
            this.isConnected = false;
          },
        });

      this.isConnected = true;
      this.connectionAttempts = 0;
      this.logger.log('Conexión con Kafka establecida correctamente');
    } catch (error) {
      this.logger.error(`Error al inicializar conexión: ${error.message}`);
      this.isConnected = false;
      await this.retryConnection();
    }
  }

  private handleConnectionError(error: Error): Observable<never> {
    this.logger.error(`Error de conexión: ${error.message}`);
    this.isConnected = false;
    
    if (this.connectionAttempts < this.maxRetries) {
      this.retryConnection();
    }
    
    throw error;
  }

  private async retryConnection(): Promise<void> {
    if (this.connectionAttempts >= this.maxRetries) {
      this.logger.error(
        `Máximo de intentos de conexión alcanzado (${this.maxRetries}). No se reconectará automáticamente.`
      );
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.connectionAttempts), 30000);
    this.logger.log(`Reintentando conexión en ${delay}ms...`);
    
    setTimeout(async () => {
      await this.initializeConnection();
    }, delay);
  }

  private transformToStreamEvent(event: OrderEvent): StreamEvent | null {
    if (!event || !event.type || !event.order) {
      this.logger.warn('Evento inválido recibido, ignorando');
      return null;
    }

    const orderData = event.order;
    let statusData: Record<string, unknown> = {};

    if (orderData instanceof Order) {
      statusData = {
        id: orderData.id,
        status: orderData.status,
        customerId: orderData.customerId,
        totalAmount: orderData.totalAmount,
        createdAt: orderData.createdAt,
        updatedAt: orderData.updatedAt,
      };
    }

    return {
      type: event.type,
      orderId: orderData?.id || 'unknown',
      timestamp: event.timestamp || new Date().toISOString(),
      data: statusData,
    };
  }

  getOrderEventsStream(): Observable<StreamEvent> {
    return this.eventSubject.asObservable();
  }

  getConnectionStatus(): { connected: boolean; attempts: number } {
    return {
      connected: this.isConnected,
      attempts: this.connectionAttempts,
    };
  }

  async publishTestEvent(orderId: string, eventType: OrderEventType): Promise<void> {
    const testOrder = new Order(
      orderId,
      OrderStatus.PENDING,
      'test-customer',
      0,
      new Date(),
      new Date(),
    );

    await this.orderEventsPort.publishOrderEvent(eventType, testOrder);
    this.logger.log(`Evento de prueba publicado: ${eventType} para orden ${orderId}`);
  }
}