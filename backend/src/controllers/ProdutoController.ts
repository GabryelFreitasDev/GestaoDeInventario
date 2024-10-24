import { Request, Response } from "express";
import { ProdutoDTO } from "../dtos/ProdutoDTO";
import { ProdutoService } from "../services/ProdutoService";

class ProdutoController {
    async get(req: Request, res: Response){
        const idproduto = req.query.id;

        const detailProdutoService =  new ProdutoService();

        const produto = await detailProdutoService.get(Number(idproduto));

        return res.json(produto);
    }

    async post(req: Request, res: Response) {
        const produtoReq: ProdutoDTO = req.body;

        const createProdutoService = new ProdutoService();

        const produtoRes = await createProdutoService.post(produtoReq);

        return res.json(produtoRes);
    }

    async put(req: Request, res: Response) {
        const produtoReq: ProdutoDTO = req.body;

        const createProdutoService = new ProdutoService();

        const produtoRes = await createProdutoService.put(produtoReq);

        return res.json(produtoRes);
    }

    async delete(req: Request, res: Response) {
        const idproduto = req.query.id;

        const createProdutoService = new ProdutoService();

        const produtoRes = await createProdutoService.delete(Number(idproduto));

        return res.json(produtoRes);
    }
}

export { ProdutoController }