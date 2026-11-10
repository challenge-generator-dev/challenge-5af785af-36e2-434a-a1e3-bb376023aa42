import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <div class="sidenav-header">
          <mat-icon>local_shipping</mat-icon>
          <span>Order Tracker</span>
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/orders" routerLinkActive="active-link">
            <mat-icon matListItemIcon>list_alt</mat-icon>
            <span matListItemTitle>Órdenes</span>
          </a>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/settings" routerLinkActive="active-link">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Configuración</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      
      <mat-sidenav-content class="main-content">
        <mat-toolbar color="primary" class="toolbar">
          <button mat-icon-button (click)="toggleSidenav()">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="toolbar-title">{{ title }}</span>
          <span class="spacer"></span>
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Perfil</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Cerrar sesión</span>
            </button>
          </mat-menu>
        </mat-toolbar>
        
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
      display: flex;
    }
    
    .sidenav {
      width: 280px;
      background: linear-gradient(180deg, #1a237e 0%, #283593 100%);
      border-right: none;
    }
    
    .sidenav-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 16px;
      color: white;
      font-size: 20px;
      font-weight: 500;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }
    
    .sidenav-header mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
    }
    
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .toolbar-title {
      margin-left: 16px;
      font-weight: 400;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    
    .active-link {
      background-color: rgba(255, 255, 255, 0.1) !important;
      border-left: 3px solid #fff;
    }
    
    ::ng-deep .mat-mdc-list-item {
      color: rgba(255, 255, 255, 0.87) !important;
    }
    
    ::ng-deep .mat-mdc-list-item:hover {
      background-color: rgba(255, 255, 255, 0.08) !important;
    }
  `]
})
export class AppComponent {
  title = 'Order Tracker';
  private sidenavOpened = true;
  
  constructor(private snackBar: MatSnackBar) {}
  
  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
  
  logout(): void {
    this.snackBar.open('Sesión cerrada correctamente', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}