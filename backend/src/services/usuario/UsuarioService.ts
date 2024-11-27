import { hash } from "bcryptjs";
import { UsuarioDTO } from "../../dtos/UsuarioDTO";
import prismaClient from "../../prisma"

const selectUsuario = {
    id: true,
    nome: true,
    email: true
}

class UsuarioService {
    async get(id: number) {
        const usuario = await prismaClient.usuario.findFirst({
            where:{
                id: id
            }, 
            select: selectUsuario
        });

        return usuario;
    }

    async getAll() {
        const usuario = await prismaClient.usuario.findMany({
            select: selectUsuario
        });

        return usuario;
    }

    async post(usuario: UsuarioDTO) { 
        console.log(usuario);
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

    async put(usuario: UsuarioDTO) { 
        const senhaHash = await hash(usuario.senha, 8);
        const usuarioSalvo = await prismaClient.usuario.update(
            {
                data: {
                    nome: usuario.nome,
                    email: usuario.email,
                    senha: senhaHash
                },
                select: selectUsuario,
                where: { id: usuario.id }
            })

        return usuarioSalvo;
    }

    async delete(id: number) {
        const usuario = await prismaClient.usuario.delete({
            select: selectUsuario,
            where: { id: id }
        })
        return usuario;
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