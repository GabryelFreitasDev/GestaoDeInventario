import { Router, Request, Response } from 'express';
import { CreateUsuarioController } from './controllers/usuario/CreateUsuarioController'
import { AuthUsuarioController } from './controllers/usuario/AuthUsuarioController';

const router = Router();

//-- Rotas --

// USUARIO
router.post('/usuario', new CreateUsuarioController().handle)
router.post('/login', new AuthUsuarioController().handle)

export {router};