import { PedidoDTO } from "./PedidoDTO";

export type ClienteDTO = {
    id?: number;
    nome: string;
    cpf_cnpj: string;
    contato: string;
    endereco: string;
    pedidos?: PedidoDTO[];
  }
  