import { Request, Response } from "express";
import { UsuarioDTO } from "../../dtos/UsuarioDTO";
import { CreateUsuarioService } from "../../services/usuario/CreateUsuarioService";

class CreateUsuarioController {
    async handle(req: Request, res: Response) {
        const usuarioReq: UsuarioDTO = req.body;

        const createUsuarioService = new CreateUsuarioService();

        const usuarioRes = await createUsuarioService.execute(usuarioReq);
        if(usuarioRes )

        return res.json(usuarioRes);
    }
}

export { CreateUsuarioController }