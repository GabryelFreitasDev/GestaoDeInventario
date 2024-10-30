import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

export interface ItemPedido {
    id?: number;
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
    pedido?: Pedido;
    produto?: Produto;
  }
  