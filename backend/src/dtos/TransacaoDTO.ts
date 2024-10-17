import { PedidoDTO } from "./PedidoDTO";
import { ProdutoDTO } from "./ProdutoDTO";

export type TransacaoDTO = {
    id?: BigInt;
    data: Date;
    tipo: string;
    valor: number;
    produtoId: BigInt;
    pedidoId: BigInt;
    produto?: ProdutoDTO;
    pedido?: PedidoDTO;
  }
  