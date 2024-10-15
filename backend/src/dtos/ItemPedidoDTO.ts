import { PedidoDTO } from "./PedidoDTO";
import { ProdutoDTO } from "./ProdutoDTO";

export type ItemPedidoDTO = {
    id: bigint;
    pedidoId: bigint;
    produtoId: bigint;
    quantidade: number;
    precoUnitario: number;
    pedido?: PedidoDTO;
    produto?: ProdutoDTO;
  }
  