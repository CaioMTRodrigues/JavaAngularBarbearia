// app.routes.ts
import { Routes } from '@angular/router';
import { ClientListComponent } from './features/clientes/list/client-list/client-list.component';
import { ClientCreateComponent } from './features/clientes/create/cliente-create/cliente-create.component';
import { ClientEditComponent } from './features/clientes/edit/edit.component';
import { AgendamentoListComponent } from './features/agendamentos/list/list.component';
import { AgendamentoCreateComponent } from './features/agendamentos/create/create.component';

export const routes: Routes = [
  { path: 'clientes', component: ClientListComponent },
  { path: 'clientes/cadastrar', component: ClientCreateComponent },
  { path: 'clientes/editar/:id', component: ClientEditComponent },
  { path: 'agendamentos', component: AgendamentoListComponent },
  { path: 'agendamentos/cadastrar', component: AgendamentoCreateComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: '**', redirectTo: '/clientes' }
];
