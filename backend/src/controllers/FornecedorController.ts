import { Request, Response } from "express";
import { FornecedorDTO } from "../dtos/FornecedorDTO";
import { FornecedorService } from "../services/FornecedorService";

class FornecedorController {
    async get(req: Request, res: Response){
        const idfornecedor = req.query.id;

        const fornecedorService =  new FornecedorService();
        let fornecedor;

        if(idfornecedor !== null && idfornecedor !== undefined)
            fornecedor = await fornecedorService.get(Number(idfornecedor));
        else
            fornecedor = await fornecedorService.getAll();

        return res.json(fornecedor);
    }

    async post(req: Request, res: Response) {
        const fornecedorReq: FornecedorDTO = req.body;

        const createFornecedorService = new FornecedorService();

        const fornecedorRes = await createFornecedorService.post(fornecedorReq);

        return res.json(fornecedorRes);
    }

    async put(req: Request, res: Response) {
        const fornecedorReq: FornecedorDTO = req.body;

        const createFornecedorService = new FornecedorService();

        const fornecedorRes = await createFornecedorService.put(fornecedorReq);

        return res.json(fornecedorRes);
    }

    async delete(req: Request, res: Response) {
        const idfornecedor = req.query.id;

        const createFornecedorService = new FornecedorService();

        const fornecedorRes = await createFornecedorService.delete(Number(idfornecedor));

        return res.json(fornecedorRes);
    }
}

export { FornecedorController }