import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agendamento-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class AgendamentoCreateComponent {
  private fb = inject(FormBuilder);
  private agendamentoService = inject(AgendamentoService);
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  clientes$ = this.clienteService.listar();
  barbeiros = ['João', 'Carlos', 'Marcos', 'Antônio'];

  agendamentoForm = this.fb.group({
    clienteId: ['', Validators.required],
    dataHora: ['', Validators.required],
    servico: ['', Validators.required],
    barbeiro: ['', Validators.required],
    observacoes: ['']
  });

  onSubmit() {
    if (this.agendamentoForm.valid) {
      this.agendamentoService.criar(this.agendamentoForm.value).subscribe({
        next: () => {
          this.snackBar.open('Agendamento criado com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/agendamentos']);
        },
        error: (err) => {
          this.snackBar.open(
            err.error?.message || 'Erro ao criar agendamento',
            'Fechar',
            { duration: 5000 }
          );
        }
      });
    }
  }
}
