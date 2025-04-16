import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cliente } from '../../shared/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/clientes`;


  private _clientes = signal<Cliente[]>([]);
  clientes = this._clientes.asReadonly();

  constructor() {
    this.carregarClientes();
  }

  /**
   * Carrega todos os clientes e atualiza o estado
   */
  private carregarClientes(): void {
    this.http.get<Cliente[]>(this.apiUrl).pipe(
      tap(clientes => this._clientes.set(clientes))
    ).subscribe();
  }

  /**
   * Cria um novo cliente (POST)
   * @param cliente Dados do cliente (sem ID)
   * @returns Observable com o cliente criado
   */
  criar(cliente: Omit<Cliente, 'id'>): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente).pipe(
      tap(novoCliente => {
        this._clientes.update(clientes => [...clientes, novoCliente]);
      })
    );
  }

  /**
   * Atualiza um cliente existente (PUT)
   * @param id ID do cliente
   * @param cliente Dados atualizados
   * @returns Observable com o cliente atualizado
   */
  atualizar(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente).pipe(
      tap(clienteAtualizado => {
        this._clientes.update(clientes =>
          clientes.map(c => c.id === id ? {...c, ...clienteAtualizado} : c)
        );
      })
    );
  }

  /**
   * Remove um cliente (DELETE)
   * @param id ID do cliente
   * @returns Observable vazio
   */
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._clientes.update(clientes => clientes.filter(c => c.id !== id));
      })
    );
  }

  /**
   * Busca um cliente por ID (GET)
   * @param id ID do cliente
   * @returns Observable com o cliente encontrado
   */
  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  /**
   * Busca clientes por nome (para autocomplete)
   * @param termo Termo de busca
   * @returns Observable com array de clientes
   */
  buscarPorNome(termo: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/buscar?nome=${termo}`);
  }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }


  create = this.criar;
  update = this.atualizar;
  delete = this.excluir;
  findById = this.buscarPorId;
  searchByName = this.buscarPorNome;
}
