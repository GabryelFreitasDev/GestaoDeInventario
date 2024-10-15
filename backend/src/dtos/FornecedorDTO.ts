import { ProdutoDTO } from "./ProdutoDTO";

export type FornecedorDTO = {
    id: bigint;
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
    produtos?: ProdutoDTO[];
  }
  