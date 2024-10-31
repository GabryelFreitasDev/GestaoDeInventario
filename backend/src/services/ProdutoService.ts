import { hash } from "bcryptjs";
import { ProdutoDTO } from "../dtos/ProdutoDTO";
import prismaClient from "../prisma"

const selectProduto = {
    id: true,
    nome: true,
    descricao: true,
    preco: true,
    quantidade: true,
    imagem: true,
    fornecedorId: true,
}

function dataProduto(produto: ProdutoDTO){
    return {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        quantidade: produto.quantidade,
        imagem: Buffer.from(produto.imagem),
        fornecedorId: produto.fornecedorId
    }
}

class ProdutoService {
    async get(id: number) {
        const produto = await prismaClient.produto.findFirst({
            where:{
                id: id
            }, 
            select: selectProduto
        });

        return produto;
    }

    async getAll() {
        const produto = await prismaClient.produto.findMany({
            select: selectProduto
        });

        return produto;
    }

    async post(produto: ProdutoDTO) { 
        const produtoSalvo = await prismaClient.produto.create(
            {
                data: dataProduto(produto),
                select: selectProduto
            })

        return produtoSalvo;
    }

    async put(produto: ProdutoDTO) { 
        const produtoSalvo = await prismaClient.produto.update(
            {
                data: dataProduto(produto),
                select: selectProduto,
                where: { id: produto.id }
            })

        return produtoSalvo;
    }

    async delete(id: number) {
        const produto = await prismaClient.produto.delete({
            select: selectProduto,
            where: { id: id }
        })
        return produto;
    }
}


export { ProdutoService }