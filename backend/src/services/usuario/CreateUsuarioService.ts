import { hash } from "bcryptjs";
import { UsuarioDTO } from "../../dtos/UsuarioDTO";
import prismaClient from "../../prisma";
import { validarCampo } from "../BaseService";

class CreateUsuarioService {
    async execute(usuario: UsuarioDTO) {

        await validaUsuario(usuario);

        const senhaHash = await hash(usuario.senha, 8);

        const usuarioSalvo = await prismaClient.usuario.create(
            {
                data: {
                    ...usuario,
                    senha: senhaHash
                },
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            })

        return usuarioSalvo;
    }
}

function validaDadosUsuario(usuario: UsuarioDTO) {
    validarCampo(usuario.nome, "Insira o nome do usuário!")
    validarCampo(usuario.email, "Insira o e-mail do usuário!")
    validarCampo(usuario.senha, "Insira a senha do usuário!")
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

async function validaUsuario(usuario: UsuarioDTO) {
    validaDadosUsuario(usuario)
    await validaExistenciaUsuario(usuario);
}

export { CreateUsuarioService }