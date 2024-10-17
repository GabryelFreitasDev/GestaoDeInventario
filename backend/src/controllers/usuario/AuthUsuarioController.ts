import { Request, Response } from "express";
import { AuthUsuarioService } from "../../services/usuario/AuthUsuarioService";
import AuthRequest from "../../interfaces/AuthRequest";

class AuthUsuarioController {
    async handle(req: Request, res: Response) {
        const authRequest: AuthRequest = req.body;

        const authUsuarioService = new AuthUsuarioService();

        const auth = await authUsuarioService.execute(authRequest);

        return res.json(auth);
    }
}

export { AuthUsuarioController }