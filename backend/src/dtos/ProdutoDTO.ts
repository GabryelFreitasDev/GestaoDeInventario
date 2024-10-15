import { FornecedorDTO } from "./FornecedorDTO";
import { ItemPedidoDTO } from "./ItemPedidoDTO";
import { TransacaoDTO } from "./TransacaoDTO";

export type ProdutoDTO = {
    id: bigint;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: Uint8Array;
    fornecedorId: bigint;
    fornecedor?: FornecedorDTO;
    itenspedido?: ItemPedidoDTO[];
    transacoes?: TransacaoDTO[];
  }
  