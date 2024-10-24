import { hash } from "bcryptjs";
import { FornecedorDTO } from "../dtos/FornecedorDTO";
import prismaClient from "../prisma"

const selectFornecedor = {
    id: true,
    nome: true,
    cnpj: true,
    contato: true,
    endereco: true
}

function dataFornecedor(fornecedor: FornecedorDTO){
    return {
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        contato: fornecedor.contato,
        endereco: fornecedor.endereco
    }
}

class FornecedorService {
    async get(id: number) {
        const fornecedor = await prismaClient.fornecedor.findFirst({
            where:{
                id: id
            }, 
            select: selectFornecedor
        });

        return fornecedor;
    }

    async post(fornecedor: FornecedorDTO) { 
        const fornecedorSalvo = await prismaClient.fornecedor.create(
            {
                data: dataFornecedor(fornecedor),
                select: selectFornecedor
            })

        return fornecedorSalvo;
    }

    async put(fornecedor: FornecedorDTO) { 
        const fornecedorSalvo = await prismaClient.fornecedor.update(
            {
                data: dataFornecedor(fornecedor),
                select: selectFornecedor,
                where: { id: fornecedor.id }
            })

        return fornecedorSalvo;
    }

    async delete(id: number) {
        const fornecedor = await prismaClient.fornecedor.delete({
            select: selectFornecedor,
            where: { id: id }
        })
        return fornecedor;
    }
}


export { FornecedorService }