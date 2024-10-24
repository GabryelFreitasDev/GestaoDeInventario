import { hash } from "bcryptjs";
import { TransacaoDTO } from "../dtos/TransacaoDTO";
import prismaClient from "../prisma"

const selectTransacao = {
    id: true,
    data:true,
    tipo: true,
    valor:true,
    produtoId: true,
    pedidoId: true,
}

function dataTransacao(transacao: TransacaoDTO){
    return {
        data: transacao.data,
        tipo: transacao.tipo,
        valor: transacao.valor,
        produtoId: transacao.produtoId,
        pedidoId: transacao.pedidoId
    }
}

class TransacaoService {
    async get(id: number) {
        const Transacao = await prismaClient.transacao.findFirst({
            where:{
                id: id
            }, 
            select: selectTransacao
        });

        return Transacao;
    }

    async post(Transacao: TransacaoDTO) { 
        const TransacaoSalvo = await prismaClient.transacao.create(
            {
                data: dataTransacao(Transacao),
                select: selectTransacao
            })

        return TransacaoSalvo;
    }

    async put(Transacao: TransacaoDTO) { 
        const TransacaoSalvo = await prismaClient.transacao.update(
            {
                data: dataTransacao(Transacao),
                select: selectTransacao,
                where: { id: Transacao.id }
            })

        return TransacaoSalvo;
    }

    async delete(id: number) {
        const Transacao = await prismaClient.transacao.delete({
            select: selectTransacao,
            where: { id: id }
        })
        return Transacao;
    }
}


export { TransacaoService }