import { ClienteDTO } from "./ClienteDTO";
import { ItemPedidoDTO } from "./ItemPedidoDTO";
import { TransacaoDTO } from "./TransacaoDTO";

export type PedidoDTO = {
    id: bigint;
    data: Date;
    clienteId: bigint;
    status: string;
    total: number;
    cliente?: ClienteDTO;
    itenspedido?: ItemPedidoDTO[];
    transacoes?: TransacaoDTO[];
  }
  