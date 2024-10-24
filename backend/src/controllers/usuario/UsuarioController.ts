import { Request, Response } from "express";
import { UsuarioService } from "../../services/usuario/UsuarioService";
import { UsuarioDTO } from "../../dtos/UsuarioDTO";

class UsuarioController {
    async get(req: Request, res: Response){
        const idusuario = req.idusuario;

        const usuarioService =  new UsuarioService();

        const usuario = await usuarioService.get(idusuario);

        return res.json(usuario);
    }

    async post(req: Request, res: Response) {
        const usuarioReq: UsuarioDTO = req.body;

        const usuarioService = new UsuarioService();

        const usuarioRes = await usuarioService.post(usuarioReq);

        return res.json(usuarioRes);
    }

    async put(req: Request, res: Response) {
        const usuarioReq: UsuarioDTO = req.body;

        const usuarioService = new UsuarioService();

        const usuarioRes = await usuarioService.put(usuarioReq);

        return res.json(usuarioRes);
    }

    async delete(req: Request, res: Response) {
        const idusuario = req.idusuario;

        const usuarioService = new UsuarioService();

        const usuarioRes = await usuarioService.delete(idusuario);

        return res.json(usuarioRes);
    }
}

export { UsuarioController }