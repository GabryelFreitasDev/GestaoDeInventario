import { Request, Response } from "express";
import { ItemPedidoDTO } from "../dtos/ItemPedidoDTO";
import { ItemPedidoService } from "../services/ItemPedidoService";

class ItemPedidoController {
    async get(req: Request, res: Response){
        const iditempedido = req.query.id;

        const detailItemPedidoService =  new ItemPedidoService();

        const itempedido = await detailItemPedidoService.get(Number(iditempedido));

        return res.json(itempedido);
    }

    async post(req: Request, res: Response) {
        const itempedidoReq: ItemPedidoDTO = req.body;

        const createItemPedidoService = new ItemPedidoService();

        const itempedidoRes = await createItemPedidoService.post(itempedidoReq);

        return res.json(itempedidoRes);
    }

    async put(req: Request, res: Response) {
        const itempedidoReq: ItemPedidoDTO = req.body;

        const createItemPedidoService = new ItemPedidoService();

        const itempedidoRes = await createItemPedidoService.put(itempedidoReq);

        return res.json(itempedidoRes);
    }

    async delete(req: Request, res: Response) {
        const iditempedido = req.query.id;

        const createItemPedidoService = new ItemPedidoService();

        const itempedidoRes = await createItemPedidoService.delete(Number(iditempedido));

        return res.json(itempedidoRes);
    }
}

export { ItemPedidoController }