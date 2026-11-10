import { TestBed } from '@angular/core/testing';
import { OrderEventsService } from './order-events.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderEvent } from '../../features/orders/orders.component';

describe('OrderEventsService', () => {
  let service: OrderEventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderEventsService]
    });
    
    service = TestBed.inject(OrderEventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service.disconnect();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize signals with default values', () => {
    expect(service.orders()).toEqual([]);
    expect(service.error()).toBeNull();
    expect(service.isConnected()).toBeFalse();
  });

  describe('connect', () => {
    it('should set isConnected to true when connection is established', () => {
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onopen?.(new Event('open'));
      }
      expect(service.isConnected()).toBeTrue();
      expect(service.error()).toBeNull();
    });

    it('should process CREATED order event correctly', () => {
      const mockEvent: OrderEvent = {
        id: '1',
        type: 'CREATED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: { status: 'pending', items: [] }
      };
      
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(mockEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      expect(service.orders()).toContain(jasmine.objectContaining(mockEvent));
    });

    it('should process UPDATED order event correctly', () => {
      const initialEvent: OrderEvent = {
        id: '1',
        type: 'CREATED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: { status: 'pending', items: [] }
      };
      
      const updatedEvent: OrderEvent = {
        id: '1',
        type: 'UPDATED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: { status: 'shipped', items: [] }
      };
      
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(initialEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(updatedEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      expect(service.orders()[0].details.status).toBe('shipped');
    });

    it('should process DELETED order event correctly', () => {
      const initialEvent: OrderEvent = {
        id: '1',
        type: 'CREATED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: { status: 'pending', items: [] }
      };
      
      const deleteEvent: OrderEvent = {
        id: '1',
        type: 'DELETED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: {}
      };
      
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(initialEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(deleteEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      expect(service.orders().length).toBe(0);
    });

    it('should set error when connection fails', () => {
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onerror?.(new Event('error'));
      }
      expect(service.isConnected()).toBeFalse();
      expect(service.error()).toBe('Error de conexión con el servidor de eventos');
    });
  });

  describe('disconnect', () => {
    it('should close event source and reset connection state', () => {
      service.connect();
      service.disconnect();
      expect(service['eventSource']).toBeNull();
      expect(service.isConnected()).toBeFalse();
    });
  });

  describe('getConnectionStatus', () => {
    it('should return an observable with current connection status', (done) => {
      service.getConnectionStatus().subscribe(status => {
        expect(status).toBeFalse();
        done();
      });
    });
  });
});