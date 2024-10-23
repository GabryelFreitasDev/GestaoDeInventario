import { Router, Request, Response } from 'express';
import { CreateUsuarioController } from './controllers/usuario/CreateUsuarioController'
import { AuthUsuarioController } from './controllers/usuario/AuthUsuarioController';
import { DetailUsuarioController } from './controllers/usuario/DetailUsuarioController';
import { IsAuthenticated } from './middlewares/IsAuthenticated';

const router = Router();

//-- Rotas --

// USUARIO
router.post('/usuario', new CreateUsuarioController().handle)
router.post('/login', new AuthUsuarioController().handle)
router.get('/usuarioinfo', IsAuthenticated, new DetailUsuarioController().handle)

export {router};