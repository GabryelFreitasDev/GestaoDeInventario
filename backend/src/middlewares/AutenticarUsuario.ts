import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
}

export function AutenticarUsuario(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    console.log(authToken);
    
    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");
   
    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

        req.idusuario = Number(sub);

        return next();
    } catch (err) {
        return res.status(401).end();
    }
}