import { Request, Response } from "express";
import { UsuarioService } from "../../services/usuario/UsuarioService";
import { UsuarioDTO } from "../../dtos/UsuarioDTO";

class UsuarioController {
    async get(req: Request, res: Response){
        const usuario_id = req.usuario_id;

        const detailUsuarioService =  new UsuarioService();

        const usuario = await detailUsuarioService.get(usuario_id);

        return res.json(usuario);
    }

    async post(req: Request, res: Response) {
        const usuarioReq: UsuarioDTO = req.body;

        const createUsuarioService = new UsuarioService();

        const usuarioRes = await createUsuarioService.post(usuarioReq);
        if(usuarioRes )

        return res.json(usuarioRes);
    }

    async put(req: Request, res: Response) {
        const usuarioReq: UsuarioDTO = req.body;

        const createUsuarioService = new UsuarioService();

        const usuarioRes = await createUsuarioService.post(usuarioReq);
        if(usuarioRes )

        return res.json(usuarioRes);
    }
}

export { UsuarioController }