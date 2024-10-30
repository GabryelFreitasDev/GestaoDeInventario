import { Fornecedor } from "./Fornecedor";

export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: Uint8Array;
    fornecedorId: number;
    fornecedor?: Fornecedor;
  }
  