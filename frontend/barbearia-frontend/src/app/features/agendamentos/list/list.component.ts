import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Agendamento } from '../../../shared/models/agendamento.model';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AgendamentoListComponent {
  private agendamentoService = inject(AgendamentoService);

  displayedColumns: string[] = ['cliente', 'data', 'servico', 'barbeiro', 'acoes'];
  dataSource = new MatTableDataSource<Agendamento>();


  ngOnInit() {
    this.agendamentoService.listar().subscribe({
      next: (agendamentos) => {
        this.dataSource.data = agendamentos || []; // Garante array vazio se null
      },
      error: () => {
        this.dataSource.data = []; // Array vazio em caso de erro
      }
    });
  }

  cancelarAgendamento(id: number) {
    if(confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.agendamentoService.cancelar(id).subscribe({
        next: (agendamentos : any) => {
          this.dataSource.data = agendamentos || []; // Garante array vazio se null
        },
        error: () => {
          this.dataSource.data = []; // Array vazio em caso de erro
        }
      });
    }
  }
}
