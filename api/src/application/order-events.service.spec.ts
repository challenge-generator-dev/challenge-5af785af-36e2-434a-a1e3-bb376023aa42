import { Test, TestingModule } from '@nestjs/testing';
import { OrderEventsService } from './order-events.service';
import { OrderEventsPort, OrderEvent, OrderEventType } from '../domain/order-events.port';
import { Order, OrderStatus } from '../domain/order.entity';
import { Observable, of, throwError, Subject } from 'rxjs';

describe('OrderEventsService', () => {
  let service: OrderEventsService;
  let mockPort: jest.Mocked<OrderEventsPort>;
  let eventSubject: Subject<OrderEvent>;

  const mockOrder = new Order(
    'order-123',
    OrderStatus.PENDING,
    'customer-456',
    100.50,
    new Date(),
    new Date(),
  );

  beforeEach(async () => {
    eventSubject = new Subject<OrderEvent>();
    
    mockPort = {
      publishOrderEvent: jest.fn().mockResolvedValue(undefined),
      getOrderEvents: jest.fn().mockReturnValue(eventSubject.asObservable()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderEventsService,
        {
          provide: OrderEventsPort,
          useValue: mockPort,
        },
      ],
    }).compile();

    service = module.get<OrderEventsService>(OrderEventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onModuleInit', () => {
    it('debe establecer conexión con el puerto de eventos', async () => {
      await service.onModuleInit();
      expect(mockPort.getOrderEvents).toHaveBeenCalled();
    });

    it('debe manejar errores de conexión correctamente', async () => {
      const errorPort = {
        publishOrderEvent: jest.fn().mockResolvedValue(undefined),
        getOrderEvents: jest.fn().mockReturnValue(throwError(() => new Error('Connection failed'))),
      };

      const errorModule: TestingModule = await Test.createTestingModule({
        providers: [
          OrderEventsService,
          {
            provide: OrderEventsPort,
            useValue: errorPort,
          },
        ],
      }).compile();

      const errorService = errorModule.get<OrderEventsService>(OrderEventsService);
      await expect(errorService.onModuleInit()).rejects.toThrow('Connection failed');
    });
  });

  describe('getOrderEventsStream', () => {
    it('debe retornar un observable de eventos', async () => {
      await service.onModuleInit();
      const stream = service.getOrderEventsStream();
      expect(stream).toBeInstanceOf(Observable);
    });

    it('debe emitir eventos cuando el puerto emite', async () => {
      await service.onModuleInit();
      const events: any[] = [];
      
      service.getOrderEventsStream().subscribe((event) => {
        events.push(event);
      });

      const mockEvent: OrderEvent = {
        type: OrderEventType.ORDER_CREATED,
        order: mockOrder,
        timestamp: new Date().toISOString(),
      };

      eventSubject.next(mockEvent);
      expect(events.length).toBeGreaterThan(0);
    });
  });

  describe('getConnectionStatus', () => {
    it('debe retornar estado de conexión inicial', () => {
      const status = service.getConnectionStatus();
      expect(status).toHaveProperty('connected');
      expect(status).toHaveProperty('attempts');
    });
  });

  describe('publishTestEvent', () => {
    it('debe publicar un evento de prueba', async () => {
      await service.publishTestEvent('order-999', OrderEventType.ORDER_UPDATED);
      expect(mockPort.publishOrderEvent).toHaveBeenCalledWith(
        OrderEventType.ORDER_UPDATED,
        expect.any(Order),
      );
    });
  });

  describe('manejo de errores', () => {
    it('debe manejar eventos nulos o indefinidos', async () => {
      await service.onModuleInit();
      const events: any[] = [];
      
      service.getOrderEventsStream().subscribe((event) => {
        events.push(event);
      });

      eventSubject.next(null as any);
      eventSubject.next(undefined as any);
    });
  });
});