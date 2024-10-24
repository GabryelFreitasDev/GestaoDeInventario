import { hash } from "bcryptjs";
import { UsuarioDTO } from "../../dtos/UsuarioDTO";
import prismaClient from "../../prisma"

const selectUsuario = {
    id: true,
    nome: true,
    email: true
}

class UsuarioService {
    async get(usuario_id: number) {
        const usuario = await prismaClient.usuario.findFirst({
            where:{
                id: usuario_id
            }, 
            select: selectUsuario
        });

        return usuario;
    }

    async post(usuario: UsuarioDTO) { 
        await validaExistenciaUsuario(usuario);
        const senhaHash = await hash(usuario.senha, 8);
        const usuarioSalvo = await prismaClient.usuario.create(
            {
                data: {
                    ...usuario,
                    senha: senhaHash
                },
                select: selectUsuario
            })

        return usuarioSalvo;
    }
}

async function validaExistenciaUsuario(usuario: UsuarioDTO) {
    const usuarioJaExiste = await prismaClient.usuario.findFirst({
        where: {
            email: usuario.email
        }
    });

    if (usuarioJaExiste)
        throw new Error("Já existe um usuário cadastrado com esse e-mail!")
}

export { UsuarioService }