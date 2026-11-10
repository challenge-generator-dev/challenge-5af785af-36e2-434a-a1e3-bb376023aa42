import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderEvent } from '../models/order-event.model';

@Injectable({
  providedIn: 'root'
})
export class OrderEventsService {
  private readonly apiUrl = 'http://localhost:3000/order-events';
  private eventSource: EventSource | null = null;
  
  orders = signal<OrderEvent[]>([]);
  error = signal<string | null>(null);
  isConnected = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  connect(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
    
    this.eventSource = new EventSource(this.apiUrl);
    
    this.eventSource.onopen = () => {
      this.isConnected.set(true);
      this.error.set(null);
    };
    
    this.eventSource.onmessage = (event) => {
      try {
        const orderEvent: OrderEvent = JSON.parse(event.data);
        this.processOrderEvent(orderEvent);
      } catch (error) {
        this.error.set('Error al parsear el evento recibido');
        console.error('Error parsing event:', error);
      }
    };
    
    this.eventSource.onerror = () => {
      this.isConnected.set(false);
      this.error.set('Error de conexión con el servidor de eventos');
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.isConnected.set(false);
    }
  }

  private processOrderEvent(event: OrderEvent): void {
    const currentOrders = this.orders();
    
    switch (event.type) {
      case 'CREATED':
        this.orders.set([...currentOrders, event]);
        break;
      case 'UPDATED':
        this.orders.update(orders => orders.map(order => 
          order.id === event.id ? { ...order, ...event } : order
        ));
        break;
      case 'DELETED':
        this.orders.update(orders => orders.filter(order => order.id !== event.id));
        break;
      default:
        console.warn('Tipo de evento desconocido:', event.type);
    }
  }

  getConnectionStatus(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(this.isConnected());
    });
  }
}