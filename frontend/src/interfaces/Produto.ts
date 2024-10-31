import { Fornecedor } from "./Fornecedor";

export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: string;
    fornecedorId: number;
    fornecedor?: Fornecedor;
  }
  