import { PedidoDTO } from "./PedidoDTO";

export type ClienteDTO = {
    id: bigint;
    nome: string;
    cpf_cnpj: string;
    contato: string;
    endereco: string;
    pedidos?: PedidoDTO[];
  }
  