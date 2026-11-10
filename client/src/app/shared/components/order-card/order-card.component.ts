import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Order, OrderEvent } from '../../../features/orders/orders.component';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="order-card" [class.expanded]="expanded">
      <mat-card-header>
        <mat-card-title>{{ order.id }}</mat-card-title>
        <mat-card-subtitle>{{ order.customerName }}</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="order-details">
          <div class="detail-row">
            <span class="label">Estado:</span>
            <mat-chip [style.background-color]="getStatusColor(order.status)" class="status-chip">
              {{ order.status }}
            </mat-chip>
          </div>
          
          <div class="detail-row">
            <span class="label">Total:</span>
            <span class="amount">{{ order.totalAmount | currency }}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Items:</span>
            <span>{{ order.items }}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Creado:</span>
            <span>{{ order.createdAt | date:'short' }}</span>
          </div>
          
          <div class="detail-row" *ngIf="order.updatedAt">
            <span class="label">Actualizado:</span>
            <span>{{ order.updatedAt | date:'short' }}</span>
          </div>
        </div>
      </mat-card-content>
      
      <mat-card-actions align="end">
        <button mat-button 
                (click)="onViewDetails()"
                matTooltip="Ver detalles completos">
          <mat-icon>visibility</mat-icon>
          Ver
        </button>
        <button mat-button 
                color="primary"
                (click)="onEdit()"
                [disabled]="order.status === 'completed' || order.status === 'cancelled'">
          <mat-icon>edit</mat-icon>
          Editar
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .order-card {
      margin-bottom: 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .order-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .order-card.expanded {
      border-left: 4px solid #2196f3;
    }
    
    .order-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px 0;
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .label {
      font-weight: 500;
      color: #666;
    }
    
    .amount {
      font-weight: bold;
      color: #2e7d32;
      font-size: 1.1em;
    }
    
    .status-chip {
      color: white !important;
      font-weight: 500;
    }
    
    mat-card-actions {
      padding: 8px 16px;
    }
  `]
})
export class OrderCardComponent {
  @Input() order!: Order;
  @Input() expanded = false;
  @Output() viewDetails = new EventEmitter<Order>();
  @Output() edit = new EventEmitter<Order>();

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: '#ff9800',
      processing: '#2196f3',
      completed: '#4caf50',
      cancelled: '#f44336'
    };
    return colors[status] || '#9e9e9e';
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.order);
  }

  onEdit(): void {
    this.edit.emit(this.order);
  }
}