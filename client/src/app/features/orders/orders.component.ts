import { Component, OnInit, OnDestroy, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { OrderEventsService } from '../../core/services/order-events.service';
import { OrderCardComponent } from '../../shared/components/order-card/order-card.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

export interface Order {
  id: string;
  customerName: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  items: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderEvent {
  type: 'created' | 'updated' | 'deleted';
  orderId: string;
  order: Order;
  timestamp: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDividerModule,
    OrderCardComponent,
    ErrorMessageComponent
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private orderEventsService = inject(OrderEventsService);
  
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);
  connectionStatus = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  lastUpdate = signal<Date | null>(null);
  
  pendingCount = computed(() => 
    this.orders().filter(o => o.status === 'pending').length
  );
  
  processingCount = computed(() => 
    this.orders().filter(o => o.status === 'processing').length
  );
  
  completedCount = computed(() => 
    this.orders().filter(o => o.status === 'completed').length
  );
  
  totalRevenue = computed(() => 
    this.orders()
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.totalAmount, 0)
  );
  
  constructor() {
    effect(() => {
      const status = this.connectionStatus();
      if (status) {
        console.log('[OrdersComponent] Conexión SSE establecida');
      }
    });
  }
  
  ngOnInit(): void {
    this.initializeEventListeners();
    this.connectToEventStream();
  }
  
  ngOnDestroy(): void {
    this.orderEventsService.disconnect();
  }
  
  private initializeEventListeners(): void {
    this.orderEventsService.getConnectionStatus().subscribe({
      next: (connected) => {
        this.connectionStatus.set(connected);
        if (!connected) {
          this.errorMessage.set('Conexión perdida. Reconectando...');
        } else {
          this.errorMessage.set(null);
        }
      },
      error: (err) => {
        console.error('[OrdersComponent] Error en estado de conexión:', err);
        this.errorMessage.set('Error al monitorear conexión');
      }
    });
  }
  
  private connectToEventStream(): void {
    try {
      this.orderEventsService.connect();
      this.isLoading.set(false);
      this.lastUpdate.set(new Date());
    } catch (error) {
      this.isLoading.set(false);
      this.errorMessage.set('No se pudo conectar al stream de eventos');
      console.error('[OrdersComponent] Error al conectar:', error);
    }
  }
  
  refreshOrders(): void {
    this.isLoading.set(true);
    this.orderEventsService.disconnect();
    setTimeout(() => {
      this.connectToEventStream();
    }, 500);
  }
  
  clearError(): void {
    this.errorMessage.set(null);
  }
  
  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: '#ff9800',
      processing: '#2196f3',
      completed: '#4caf50',
      cancelled: '#f44336'
    };
    return colors[status] || '#9e9e9e';
  }
  
  trackByOrderId(index: number, order: Order): string {
    return order.id;
  }
}