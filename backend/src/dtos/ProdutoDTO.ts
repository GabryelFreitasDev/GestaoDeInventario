import { FornecedorDTO } from "./FornecedorDTO";
import { ItemPedidoDTO } from "./ItemPedidoDTO";
import { TransacaoDTO } from "./TransacaoDTO";

export type ProdutoDTO = {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: Uint8Array | string;
    fornecedorId: number;
    fornecedor?: FornecedorDTO;
    itenspedido?: ItemPedidoDTO[];
    transacoes?: TransacaoDTO[];
  }
  