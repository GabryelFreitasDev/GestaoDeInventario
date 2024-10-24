import { ClienteDTO } from "./ClienteDTO";
import { ItemPedidoDTO } from "./ItemPedidoDTO";
import { TransacaoDTO } from "./TransacaoDTO";

export type PedidoDTO = {
    id?: number;
    data: Date;
    clienteId: number;
    status: string;
    total: number;
    cliente?: ClienteDTO;
    itenspedido?: ItemPedidoDTO[];
    transacoes?: TransacaoDTO[];
  }
  