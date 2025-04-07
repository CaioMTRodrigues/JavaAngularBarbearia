// src/app/shared/models/cliente.model.ts
export interface Cliente {
  id?: number;
  nome: string | null; // Permite null
  telefone: string | null;
  email?: string | null;
  dataNascimento?: Date | string | null;
}
export class ClienteModel implements Cliente {
  constructor(
    public nome: string,
    public telefone: string,
    public email: string | null = null,
    public dataNascimento: Date | null = null,
    public id?: number
  ) {}

  static fromJson(json: any): ClienteModel {
    return new ClienteModel(
      json.nome,
      json.telefone,
      json.email || null,
      json.dataNascimento ? new Date(json.dataNascimento) : null,
      json.id
    );
  }

  toJson(): any {
    return {
      id: this.id,
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      dataNascimento: this.dataNascimento?.toISOString()
    };
  }

  get idade(): number | null {
    if (!this.dataNascimento) return null;
    const today = new Date();
    const birthDate = this.dataNascimento;
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  telefoneFormatado(): string {
    const nums = this.telefone.replace(/\D/g, '');
    if (nums.length === 11) {
      return nums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return this.telefone;
  }
}
