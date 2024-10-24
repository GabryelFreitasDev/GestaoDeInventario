import { PedidoDTO } from "./PedidoDTO";
import { ProdutoDTO } from "./ProdutoDTO";

export type TransacaoDTO = {
    id?: number;
    data: Date;
    tipo: string;
    valor: number;
    produtoId: number;
    pedidoId: number;
    produto?: ProdutoDTO;
    pedido?: PedidoDTO;
  }
  