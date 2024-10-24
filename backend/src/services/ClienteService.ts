import { hash } from "bcryptjs";
import { ClienteDTO } from "../dtos/ClienteDTO";
import prismaClient from "../prisma"

const selectCliente = {
    id: true,
    nome: true,
    cpf_cnpj: true,
    contato: true,
    endereco: true
}

function dataCliente(cliente: ClienteDTO){
    return {
        nome: cliente.nome,
        cpf_cnpj: cliente.cpf_cnpj,
        contato: cliente.contato,
        endereco: cliente.endereco
    }
}

class ClienteService {
    async get(id: number) {
        const cliente = await prismaClient.cliente.findFirst({
            where:{
                id: id
            }, 
            select: selectCliente
        });

        return cliente;
    }

    async post(cliente: ClienteDTO) { 
        const clienteSalvo = await prismaClient.cliente.create(
            {
                data: dataCliente(cliente),
                select: selectCliente
            })

        return clienteSalvo;
    }

    async put(cliente: ClienteDTO) { 
        const clienteSalvo = await prismaClient.cliente.update(
            {
                data: dataCliente(cliente),
                select: selectCliente,
                where: { id: cliente.id }
            })

        return clienteSalvo;
    }

    async delete(id: number) {
        const cliente = await prismaClient.cliente.delete({
            select: selectCliente,
            where: { id: id }
        })
        return cliente;
    }
}


export { ClienteService }