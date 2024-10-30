import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import AuthRequest from "../../interfaces/AutenticarRequest";
import { sign } from "jsonwebtoken";
import 'dotenv/config';

class AutenticarUsuarioService {
    async autenticar(authRequest: AuthRequest) {

        const usuario = await validaLogin(authRequest);

        const token = sign(
            {
                nome: usuario.nome,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                subject: usuario.id.toString(),
                expiresIn: '30d'
            }
        )

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            token: token
        }
    }
}

async function validaLogin(authRequest: AuthRequest) {
    const usuario = await prismaClient.usuario.findFirst({
        where: {
            email: authRequest.email
        }
    });

    if (!usuario)
        throw new Error("E-mail ou senha incorreta!")

    const senhaCorreta = await compare(authRequest.senha, usuario.senha);

    if (!senhaCorreta)
        throw new Error("E-mail ou senha incorreta!")

    return usuario;
}

export { AutenticarUsuarioService };