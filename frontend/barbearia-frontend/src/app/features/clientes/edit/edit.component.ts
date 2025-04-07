// src/app/features/clientes/edit/edit.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../core/services/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Cliente } from '../../../shared/models/cliente.model';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ClientEditComponent {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  clienteForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.email]],
    dataNascimento: [null as Date | null]
  });

  cliente$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.clienteService.buscarPorId(id)),
  );

  ngOnInit() {
    this.cliente$.subscribe(cliente => {
      this.clienteForm.patchValue({
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email || '',
        dataNascimento: cliente.dataNascimento ? new Date(cliente.dataNascimento) : null
      });
    });
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.cliente$.pipe(
        switchMap(cliente => {
          const updatedCliente: Cliente = {
            ...cliente,
            ...this.clienteForm.value
          };
          return this.clienteService.atualizar(cliente.id!, updatedCliente);
        })
      ).subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: (err) => console.error('Erro ao atualizar cliente', err)
      });
    }
  }

  formatarTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    }
    if (value.length > 10) {
      value = `${value.substring(0, 10)}-${value.substring(10, 14)}`;
    }

    this.clienteForm.get('telefone')?.setValue(value, { emitEvent: false });
  }
}
