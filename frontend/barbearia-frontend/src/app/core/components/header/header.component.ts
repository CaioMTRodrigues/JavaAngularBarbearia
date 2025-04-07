import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="header-container">
      <div class="logo">
        <mat-icon class="gold-icon">content_cut</mat-icon>
      <span>BARBERIA ELEGANCE</span>
      </div>

      <div class="nav-buttons">
        <a mat-button routerLink="/" routerLinkActive="active">Home</a>
        <button mat-raised-button color="accent" class="register-button gold-button" routerLink="clientes/cadastrar">
          <mat-icon class="gold-button">person_add</mat-icon>
          Cadastrar Cliente
        </button>
            <button mat-raised-button  class="register-button gold-button" color="primary" routerLink="/agendamentos/cadastrar">
           <mat-icon>add</mat-icon>
             Novo Agendamento
            </button>
      </div>
    </mat-toolbar>
  `,
  styles: `
    .header-container {
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
    }

    .logo {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .nav-buttons {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .register-button {
      margin-left: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .active {
      border-bottom: 2px solid white;
    }

    .gold-icon {
      color: #D4AF37;
      margin-right: 8px;
   }
     .gold-button {
      color:rgb(153, 126, 37);
      margin-right: 8px;
   }
  `
})
export class HeaderComponent { }
