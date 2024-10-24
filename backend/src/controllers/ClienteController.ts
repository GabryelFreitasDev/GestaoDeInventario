import { Request, Response } from "express";
import { ClienteDTO } from "../dtos/ClienteDTO";
import { ClienteService } from "../services/ClienteService";

class ClienteController {
    async get(req: Request, res: Response){
        const idcliente = req.params.id;

        const detailClienteService =  new ClienteService();

        const cliente = await detailClienteService.get(Number(idcliente));

        return res.json(cliente);
    }

    async post(req: Request, res: Response) {
        const clienteReq: ClienteDTO = req.body;

        const createClienteService = new ClienteService();

        const clienteRes = await createClienteService.post(clienteReq);

        return res.json(clienteRes);
    }

    async put(req: Request, res: Response) {
        const clienteReq: ClienteDTO = req.body;

        const createClienteService = new ClienteService();

        const clienteRes = await createClienteService.put(clienteReq);

        return res.json(clienteRes);
    }

    async delete(req: Request, res: Response) {
        const idcliente = req.params.id;

        const createClienteService = new ClienteService();

        const clienteRes = await createClienteService.delete(Number(idcliente));

        return res.json(clienteRes);
    }
}

export { ClienteController }