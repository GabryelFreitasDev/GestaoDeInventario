import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

export interface Transacao {
    id?: number;
    data: Date;
    tipo: string;
    valor: number;
    produtoId: number;
    pedidoId: number;
    produto?: Produto;
    pedido?: Pedido;
  }
  