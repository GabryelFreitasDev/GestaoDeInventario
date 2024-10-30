import { Cliente } from "./Cliente";

export interface Pedido {
    id?: number;
    data: Date;
    clienteId: number;
    status: string;
    total: number;
    cliente?: Cliente;
  }
  