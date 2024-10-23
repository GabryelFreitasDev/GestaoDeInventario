import prismaClient from "../../prisma"

class DetailUsuarioService {
    async execute(usuario_id: number) {
        const usuario = await prismaClient.usuario.findFirst({
            where:{
                id: usuario_id
            }, 
            select:{
                id: true,
                nome: true,
                email: true
            }
        });

        return usuario;
    }
}

export { DetailUsuarioService }