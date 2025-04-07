export interface Agendamento {
  id?: number;
  cliente: {
    id: number;
    nome: string;
  };
  dataHora: Date | string;
  servico: string;
  barbeiro: string;
  observacoes?: string;
  status?: string;
}
