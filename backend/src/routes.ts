import { Router, Request, Response } from 'express';
import { AutenticarUsuarioController } from './controllers/usuario/AutenticarUsuarioController';
import { UsuarioController } from './controllers/usuario/UsuarioController';
import { AutenticarUsuario } from './middlewares/AutenticarUsuario';
import { FornecedorController } from './controllers/FornecedorController';
import { ClienteController } from './controllers/ClienteController';
import { TransacaoController } from './controllers/TransacaoController';
import { ItemPedidoController } from './controllers/ItemPedidoController';
import { PedidoController } from './controllers/PedidoController';
import { ProdutoController } from './controllers/ProdutoController';

const router = Router();

//-- Rotas --

//USUARIO
router.post('/Usuario/AutenticarUsuario', new AutenticarUsuarioController().autenticar)
router.post('/Usuario', new UsuarioController().post)
router.get('/Usuario', AutenticarUsuario, new UsuarioController().get)
router.put('/Usuario', AutenticarUsuario, new UsuarioController().put)
router.delete('/Usuario', AutenticarUsuario, new UsuarioController().delete)

//CLIENTE
router.get('/Cliente', AutenticarUsuario, new ClienteController().get)
router.post('/Cliente', AutenticarUsuario, new ClienteController().post)
router.put('/Cliente', AutenticarUsuario, new ClienteController().put)
router.delete('/Cliente', AutenticarUsuario, new ClienteController().delete)

//FORNECEDOR
router.get('/Fornecedor', AutenticarUsuario, new FornecedorController().get)
router.post('/Fornecedor', AutenticarUsuario, new FornecedorController().post)
router.put('/Fornecedor', AutenticarUsuario, new FornecedorController().put)
router.delete('/Fornecedor', AutenticarUsuario, new FornecedorController().delete)

//PRODUTO
router.get('/Produto', AutenticarUsuario, new ProdutoController().get)
router.post('/Produto', AutenticarUsuario, new ProdutoController().post)
router.put('/Produto', AutenticarUsuario, new ProdutoController().put)
router.delete('/Produto', AutenticarUsuario, new ProdutoController().delete)

//PEDIDO
router.get('/Pedido', AutenticarUsuario, new PedidoController().get)
router.post('/Pedido', AutenticarUsuario, new PedidoController().post)
router.put('/Pedido', AutenticarUsuario, new PedidoController().put)
router.delete('/Pedido', AutenticarUsuario, new PedidoController().delete)

//ITEMPEDIDO
router.get('/ItemPedido', AutenticarUsuario, new ItemPedidoController().get)
router.post('/ItemPedido', AutenticarUsuario, new ItemPedidoController().post)
router.put('/ItemPedido', AutenticarUsuario, new ItemPedidoController().put)
router.delete('/ItemPedido', AutenticarUsuario, new ItemPedidoController().delete)

//TRANSACAO
router.get('/Transacao', AutenticarUsuario, new TransacaoController().get)
router.post('/Transacao', AutenticarUsuario, new TransacaoController().post)
router.put('/Transacao', AutenticarUsuario, new TransacaoController().put)
router.delete('/Transacao', AutenticarUsuario, new TransacaoController().delete)



export {router};