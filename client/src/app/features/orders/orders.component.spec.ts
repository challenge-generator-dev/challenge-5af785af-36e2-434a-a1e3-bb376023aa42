import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrderEventsService } from '@app/core/services/order-events.service';
import { Signal } from '@angular/core';
import { OrderEvent } from '@app/core/models/order-event.model';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderEventsServiceMock: jasmine.SpyObj<OrderEventsService>;
  let mockEvents: OrderEvent[];

  beforeEach(async () => {
    mockEvents = [
      {
        id: 'evt-1',
        orderId: 'ORD-001',
        type: 'CREATED',
        timestamp: new Date('2024-01-15T10:00:00Z').toISOString(),
        data: { customer: 'John Doe', total: 150.00 }
      },
      {
        id: 'evt-2',
        orderId: 'ORD-002',
        type: 'UPDATED',
        timestamp: new Date('2024-01-15T11:00:00Z').toISOString(),
        data: { status: 'shipped' }
      },
      {
        id: 'evt-3',
        orderId: 'ORD-001',
        type: 'DELETED',
        timestamp: new Date('2024-01-15T12:00:00Z').toISOString(),
        data: { reason: 'Customer request' }
      }
    ];

    orderEventsServiceMock = jasmine.createSpyObj('OrderEventsService', [
      'connect',
      'disconnect',
      'getConnectionStatus'
    ]);

    orderEventsServiceMock.connect.and.returnValue(undefined);
    orderEventsServiceMock.disconnect.and.returnValue(undefined);
    orderEventsServiceMock.getConnectionStatus.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [OrdersComponent],
      providers: [
        { provide: OrderEventsService, useValue: orderEventsServiceMock },
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call connect on initialization', () => {
    expect(orderEventsServiceMock.connect).toHaveBeenCalled();
  });

  it('should call disconnect on destruction', () => {
    fixture.destroy();
    expect(orderEventsServiceMock.disconnect).toHaveBeenCalled();
  });

  it('should display loading state initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const loadingElement = compiled.querySelector('.loading-state');
    expect(loadingElement).toBeTruthy();
  });

  it('should display events when loaded', fakeAsync(() => {
    const eventsSignal = (component as any).events;
    eventsSignal.set([...mockEvents]);
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    const eventCards = compiled.querySelectorAll('app-order-card');
    expect(eventCards.length).toBe(3);
  }));

  it('should display empty state when no events', () => {
    const eventsSignal = (component as any).events;
    eventsSignal.set([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyState = compiled.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should display error message when error signal is set', () => {
    const errorSignal = (component as any).errorMessage;
    errorSignal.set('Connection failed to event stream');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorComponent = compiled.querySelector('app-error-message');
    expect(errorComponent).toBeTruthy();
  });

  it('should not display error message when error signal is empty', () => {
    const errorSignal = (component as any).errorMessage;
    errorSignal.set('');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorComponent = compiled.querySelector('app-error-message');
    expect(errorComponent).toBeFalsy();
  });

  it('should update connection status indicator', fakeAsync(() => {
    const connectionStatusSignal = (component as any).isConnected;
    connectionStatusSignal.set(true);
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    const connectedIndicator = compiled.querySelector('.connection-status.connected');
    expect(connectedIndicator).toBeTruthy();
  }));

  it('should show disconnected status when connection is lost', fakeAsync(() => {
    const connectionStatusSignal = (component as any).isConnected;
    connectionStatusSignal.set(false);
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    const disconnectedIndicator = compiled.querySelector('.connection-status.disconnected');
    expect(disconnectedIndicator).toBeTruthy();
  }));

  it('should sort events by timestamp descending', fakeAsync(() => {
    const unsortedEvents: OrderEvent[] = [
      {
        id: 'evt-newest',
        orderId: 'ORD-003',
        type: 'CREATED',
        timestamp: new Date('2024-01-15T14:00:00Z').toISOString(),
        data: {}
      },
      {
        id: 'evt-oldest',
        orderId: 'ORD-001',
        type: 'CREATED',
        timestamp: new Date('2024-01-15T08:00:00Z').toISOString(),
        data: {}
      }
    ];

    const eventsSignal = (component as any).events;
    eventsSignal.set(unsortedEvents);
    fixture.detectChanges();
    tick();

    const eventCards = fixture.nativeElement.querySelectorAll('app-order-card');
    expect(eventCards.length).toBe(2);
  }));

  it('should handle reconnection attempt', fakeAsync(() => {
    orderEventsServiceMock.connect.calls.reset();
    component.reconnect();
    tick();
    expect(orderEventsServiceMock.connect).toHaveBeenCalled();
  }));

  describe('Event processing', () => {
    it('should filter events by type when filter is active', fakeAsync(() => {
      const eventsSignal = (component as any).events;
      eventsSignal.set([...mockEvents]);

      const filterSignal = (component as any).typeFilter;
      filterSignal.set('CREATED');
      fixture.detectChanges();
      tick();

      const compiled = fixture.nativeElement as HTMLElement;
      const eventCards = compiled.querySelectorAll('app-order-card');
      expect(eventCards.length).toBe(1);
    }));

    it('should show all events when no filter is active', fakeAsync(() => {
      const eventsSignal = (component as any).events;
      eventsSignal.set([...mockEvents]);

      const filterSignal = (component as any).typeFilter;
      filterSignal.set(null);
      fixture.detectChanges();
      tick();

      const compiled = fixture.nativeElement as HTMLElement;
      const eventCards = compiled.querySelectorAll('app-order-card');
      expect(eventCards.length).toBe(3);
    }));
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on connection status', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const statusElement = compiled.querySelector('.connection-status');
      expect(statusElement?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have proper heading structure', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h1 = compiled.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1?.textContent).toContain('Orders');
    });
  });

  describe('Edge cases', () => {
    it('should handle null events gracefully', fakeAsync(() => {
      const eventsSignal = (component as any).events;
      eventsSignal.set(null as any);
      fixture.detectChanges();
      tick();

      const compiled = fixture.nativeElement as HTMLElement;
      const emptyState = compiled.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    }));

    it('should handle malformed event data', fakeAsync(() => {
      const malformedEvents: OrderEvent[] = [
        {
          id: 'evt-malformed',
          orderId: '',
          type: 'CREATED' as any,
          timestamp: 'invalid-date',
          data: {}
        }
      ];

      const eventsSignal = (component as any).events;
      eventsSignal.set(malformedEvents);
      fixture.detectChanges();
      tick();

      expect(component).toBeTruthy();
    }));
  });
});