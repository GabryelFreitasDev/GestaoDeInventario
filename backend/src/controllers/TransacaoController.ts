import { Request, Response } from "express";
import { TransacaoDTO } from "../dtos/TransacaoDTO";
import { TransacaoService } from "../services/TransacaoService";

class TransacaoController {
    async get(req: Request, res: Response){
        const idtransacao = req.query.id;

        const detailTransacaoService =  new TransacaoService();

        const transacao = await detailTransacaoService.get(Number(idtransacao));

        return res.json(transacao);
    }

    async post(req: Request, res: Response) {
        const transacaoReq: TransacaoDTO = req.body;

        const createTransacaoService = new TransacaoService();

        const transacaoRes = await createTransacaoService.post(transacaoReq);

        return res.json(transacaoRes);
    }

    async put(req: Request, res: Response) {
        const transacaoReq: TransacaoDTO = req.body;

        const createTransacaoService = new TransacaoService();

        const transacaoRes = await createTransacaoService.put(transacaoReq);

        return res.json(transacaoRes);
    }

    async delete(req: Request, res: Response) {
        const idtransacao = req.query.id;

        const createTransacaoService = new TransacaoService();

        const transacaoRes = await createTransacaoService.delete(Number(idtransacao));

        return res.json(transacaoRes);
    }
}

export { TransacaoController }