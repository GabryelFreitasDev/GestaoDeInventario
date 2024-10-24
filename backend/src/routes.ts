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
router.post('/autenticarUsuario', new AutenticarUsuarioController().autenticar)
router.get('/getUsuario', AutenticarUsuario, new UsuarioController().get)
router.post('/postUsuario', AutenticarUsuario, new UsuarioController().post)
router.put('/putUsuario', AutenticarUsuario, new UsuarioController().put)
router.delete('/deleteUsuario', AutenticarUsuario, new UsuarioController().delete)

//CLIENTE
router.get('/getCliente', AutenticarUsuario, new ClienteController().get)
router.post('/postCliente', AutenticarUsuario, new ClienteController().post)
router.put('/putCliente', AutenticarUsuario, new ClienteController().put)
router.delete('/deleteCliente', AutenticarUsuario, new ClienteController().delete)

//FORNECEDOR
router.get('/getFornecedor', AutenticarUsuario, new FornecedorController().get)
router.post('/postFornecedor', AutenticarUsuario, new FornecedorController().post)
router.put('/putFornecedor', AutenticarUsuario, new FornecedorController().put)
router.delete('/deleteFornecedor', AutenticarUsuario, new FornecedorController().delete)

//PRODUTO
router.get('/getProduto', AutenticarUsuario, new ProdutoController().get)
router.post('/postProduto', AutenticarUsuario, new ProdutoController().post)
router.put('/putProduto', AutenticarUsuario, new ProdutoController().put)
router.delete('/deleteProduto', AutenticarUsuario, new ProdutoController().delete)

//PEDIDO
router.get('/getPedido', AutenticarUsuario, new PedidoController().get)
router.post('/postPedido', AutenticarUsuario, new PedidoController().post)
router.put('/putPedido', AutenticarUsuario, new PedidoController().put)
router.delete('/deletePedido', AutenticarUsuario, new PedidoController().delete)

//ITEMPEDIDO
router.get('/getItemPedido', AutenticarUsuario, new ItemPedidoController().get)
router.post('/postItemPedido', AutenticarUsuario, new ItemPedidoController().post)
router.put('/putItemPedido', AutenticarUsuario, new ItemPedidoController().put)
router.delete('/deleteItemPedido', AutenticarUsuario, new ItemPedidoController().delete)

//TRANSACAO
router.get('/getTransacao', AutenticarUsuario, new TransacaoController().get)
router.post('/postTransacao', AutenticarUsuario, new TransacaoController().post)
router.put('/putTransacao', AutenticarUsuario, new TransacaoController().put)
router.delete('/deleteTransacao', AutenticarUsuario, new TransacaoController().delete)



export {router};