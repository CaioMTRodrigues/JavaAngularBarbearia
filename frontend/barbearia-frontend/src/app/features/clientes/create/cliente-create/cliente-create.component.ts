// features/clientes/create/client-create.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.scss'
})
export class ClientCreateComponent {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  form = this.fb.group({
    nome: ['', Validators.required],
    telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    email: ['', [Validators.email]],
    dataNascimento: [null as Date | null]
  });

  onSubmit() {
    if (this.form.valid) {
      this.clienteService.create(this.form.value as any).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }
}
