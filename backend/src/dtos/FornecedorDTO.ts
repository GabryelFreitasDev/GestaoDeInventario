import { ProdutoDTO } from "./ProdutoDTO";

export type FornecedorDTO = {
    id?: number;
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
    produtos?: ProdutoDTO[];
  }
  