import { Request, Response } from "express";
import { AutenticarUsuarioService } from "../../services/usuario/AutenticarUsuarioService";
import AuthRequest from "../../interfaces/AuthRequest";

class AutenticarUsuarioController {
    async autenticar(req: Request, res: Response) {
        const authRequest: AuthRequest = req.body;

        const authUsuarioService = new AutenticarUsuarioService();

        const auth = await authUsuarioService.execute(authRequest);

        return res.json(auth);
    }
}

export { AutenticarUsuarioController }