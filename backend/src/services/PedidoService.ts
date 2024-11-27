import { hash } from "bcryptjs";
import { PedidoDTO } from "../dtos/PedidoDTO";
import prismaClient from "../prisma"

const selectPedido = {
    id: true,
    data: true,
    clienteId: true,
    status: true,
    total: true
}

function dataPedido(pedido: PedidoDTO){
    return {
        data: pedido.data,
        clienteId: pedido.clienteId,
        status: pedido.status,
        total: pedido.total
    }
}

class PedidoService {
    async get(id: number) {
        const Pedido = await prismaClient.pedido.findFirst({
            where:{
                id: id
            }, 
            select: selectPedido
        });

        return Pedido;
    }

    async getAll() {
        const pedido = await prismaClient.cliente.findMany({
            select: selectPedido
        });

        return pedido;
    }

    async post(Pedido: PedidoDTO) { 
        const PedidoSalvo = await prismaClient.pedido.create(
            {
                data: dataPedido(Pedido),
                select: selectPedido
            })

        return PedidoSalvo;
    }

    async put(Pedido: PedidoDTO) { 
        const PedidoSalvo = await prismaClient.pedido.update(
            {
                data: dataPedido(Pedido),
                select: selectPedido,
                where: { id: Pedido.id }
            })

        return PedidoSalvo;
    }

    async delete(id: number) {
        const Pedido = await prismaClient.pedido.delete({
            select: selectPedido,
            where: { id: id }
        })
        return Pedido;
    }
}


export { PedidoService }