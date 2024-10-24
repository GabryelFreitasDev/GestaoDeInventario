import { Router, Request, Response } from 'express';
import { AutenticarUsuarioController } from './controllers/usuario/AutenticarUsuarioController';
import { UsuarioController } from './controllers/usuario/UsuarioController';
import { IsAuthenticated } from './middlewares/IsAuthenticated';

const router = Router();

//-- Rotas --

// USUARIO
router.post('/usuario', new UsuarioController().post)
router.post('/login', new AutenticarUsuarioController().autenticar)
router.get('/usuarioinfo', IsAuthenticated, new UsuarioController().get)

export {router};