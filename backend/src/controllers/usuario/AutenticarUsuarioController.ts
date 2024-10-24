import { Request, Response } from "express";
import { AutenticarUsuarioService } from "../../services/usuario/AutenticarUsuarioService";
import AutenticarRequest from "../../interfaces/AuthRequest";

class AutenticarUsuarioController {
    async autenticar(req: Request, res: Response) {
        const autenticarRequest: AutenticarRequest = req.body;

        const autenticarUsuarioService = new AutenticarUsuarioService();

        const autenticar = await autenticarUsuarioService.autenticar(autenticarRequest);

        return res.json(autenticar);
    }
}

export { AutenticarUsuarioController }