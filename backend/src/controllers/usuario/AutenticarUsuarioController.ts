import { Request, Response } from "express";
import AutenticarRequest from "../../interfaces/AutenticarRequest";
import { AutenticarUsuarioService } from "../../services/usuario/AutenticarUsuarioService";


class AutenticarUsuarioController {
    async autenticar(req: Request, res: Response) {
        const autenticarRequest: AutenticarRequest = req.body;

        const autenticarUsuarioService = new AutenticarUsuarioService();

        const autenticar = await autenticarUsuarioService.autenticar(autenticarRequest);

        return res.json(autenticar);
    }
}

export { AutenticarUsuarioController }