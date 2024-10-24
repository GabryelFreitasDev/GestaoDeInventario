import { Request, Response } from "express";
import { PedidoDTO } from "../dtos/PedidoDTO";
import { PedidoService } from "../services/PedidoService";

class PedidoController {
    async get(req: Request, res: Response){
        const idpedido = req.query.id;

        const detailPedidoService =  new PedidoService();

        const pedido = await detailPedidoService.get(Number(idpedido));

        return res.json(pedido);
    }

    async post(req: Request, res: Response) {
        const pedidoReq: PedidoDTO = req.body;

        const createPedidoService = new PedidoService();

        const pedidoRes = await createPedidoService.post(pedidoReq);

        return res.json(pedidoRes);
    }

    async put(req: Request, res: Response) {
        const pedidoReq: PedidoDTO = req.body;

        const createPedidoService = new PedidoService();

        const pedidoRes = await createPedidoService.put(pedidoReq);

        return res.json(pedidoRes);
    }

    async delete(req: Request, res: Response) {
        const idpedido = req.query.id;

        const createPedidoService = new PedidoService();

        const pedidoRes = await createPedidoService.delete(Number(idpedido));

        return res.json(pedidoRes);
    }
}

export { PedidoController }