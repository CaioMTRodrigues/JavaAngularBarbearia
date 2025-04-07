// features/clientes/list/client-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClienteService } from '../../../../core/services/cliente.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AgendamentoListComponent } from '../../../agendamentos/list/list.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule, AgendamentoListComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  private clienteService = inject(ClienteService);
  clientes = this.clienteService.clientes;
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'acoes'];

  deleteCliente(id?: number) {
    if (!id) return;
    this.clienteService.delete((id)).subscribe();
  }
}
