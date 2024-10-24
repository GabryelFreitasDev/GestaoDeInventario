import { hash } from "bcryptjs";
import { ItemPedidoDTO } from "../dtos/ItemPedidoDTO";
import prismaClient from "../prisma"

const selectItemPedido = {
    id: true,
    pedidoId: true,
    produtoId: true,
    quantidade: true,
    precoUnitario: true
}

function dataItemPedido(itemPedido: ItemPedidoDTO){
    return {
        pedidoId: itemPedido.pedidoId,
        produtoId: itemPedido.produtoId,
        quantidade: itemPedido.quantidade,
        precoUnitario: itemPedido.precoUnitario
    }
}

class ItemPedidoService {
    async get(id: number) {
        const itemPedido = await prismaClient.itemPedido.findFirst({
            where:{
                id: id
            }, 
            select: selectItemPedido
        });

        return itemPedido;
    }

    async post(itemPedido: ItemPedidoDTO) { 
        const itemPedidoSalvo = await prismaClient.itemPedido.create(
            {
                data: dataItemPedido(itemPedido),
                select: selectItemPedido
            })

        return itemPedidoSalvo;
    }

    async put(itemPedido: ItemPedidoDTO) { 
        const itemPedidoSalvo = await prismaClient.itemPedido.update(
            {
                data: dataItemPedido(itemPedido),
                select: selectItemPedido,
                where: { id: itemPedido.id }
            })

        return itemPedidoSalvo;
    }

    async delete(id: number) {
        const itemPedido = await prismaClient.itemPedido.delete({
            select: selectItemPedido,
            where: { id: id }
        })
        return itemPedido;
    }
}


export { ItemPedidoService }