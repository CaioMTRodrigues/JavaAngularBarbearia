import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Agendamento } from '../../shared/models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${environment.apiUrl}/agendamentos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl).pipe(
      catchError(() => of([])) // Retorna array vazio em caso de erro
    );
  }

  criar(agendamento: any): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, agendamento);
  }

  cancelar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/cancelar`);
  }
}
