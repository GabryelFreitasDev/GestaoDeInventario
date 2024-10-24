import { PedidoDTO } from "./PedidoDTO";
import { ProdutoDTO } from "./ProdutoDTO";

export type ItemPedidoDTO = {
    id?: number;
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
    pedido?: PedidoDTO;
    produto?: ProdutoDTO;
  }
  