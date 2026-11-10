import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error-container" *ngIf="message" role="alert" aria-live="assertive">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <div class="error-content">
        <p class="error-text">{{ message }}</p>
        <button 
          *ngIf="dismissible" 
          class="error-dismiss" 
          (click)="dismiss()"
          aria-label="Dismiss error">
          ✕
        </button>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #991b1b;
      margin: 16px 0;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .error-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      color: #dc2626;
    }

    .error-icon svg {
      width: 100%;
      height: 100%;
    }

    .error-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .error-text {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
      font-weight: 500;
    }

    .error-dismiss {
      flex-shrink: 0;
      background: none;
      border: none;
      color: #991b1b;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 16px;
      line-height: 1;
      transition: background-color 0.2s;
    }

    .error-dismiss:hover {
      background-color: #fecaca;
    }

    .error-dismiss:focus {
      outline: 2px solid #dc2626;
      outline-offset: 2px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() dismissible: boolean = false;

  dismiss(): void {
    this.message = '';
  }
}