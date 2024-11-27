// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { CadastroProdutos } from './pages/produtos/cadastroProdutos/cadastroProdutos';
import { ListagemProdutos } from './pages/produtos/listagemProdutos/listagemprodutos';
import { ListagemClientes } from './pages/clientes/listagemClientes/listagemClientes';
import { CadastroClientes } from './pages/clientes/cadastroClientes/cadastroClientes';
import { AutenticarProvider } from './contexts/UsuarioContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotaProtegida } from './components/RotaProtegida';
import { CadastroFornecedores } from './pages/fornecedores/cadastroFornecedores/cadastroFornecedores';
import { ListagemFornecedores } from './pages/fornecedores/listagemFornecedores/listagemFornecedores';
import { CadastroPedidos } from './pages/pedido/cadastroPedido/cadastroPedido';
import { CadastroItens } from './pages/itens/cadastroItens/cadastroItens';
import { ListagemItens } from './pages/itens/listagemItens/listagemItens';
import { ListagemPedidos } from './pages/pedido/listagemPedido/listagemPedido';
import { CadastroTransacoes } from './pages/transacoes/cadastroTransacoes/cadastroTransacoes';
import { ListagemTransacoes } from './pages/transacoes/listagemTransacoes/listagemTransacoes';

function App() {
  return (
    <AutenticarProvider>
      <ToastContainer autoClose={3000} />
      <Routes>
        {/* Rota pública: Login */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<RotaProtegida />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produtos" element={<ListagemProdutos />} />
          <Route path="/produtos/cadastro" element={<CadastroProdutos />} />
          <Route path="/clientes" element={<ListagemClientes />} />
          <Route path="/clientes/cadastro" element={<CadastroClientes />} />
          <Route path="/fornecedores" element={<ListagemFornecedores />} />
          <Route path="/fornecedores/cadastro" element={<CadastroFornecedores />} />
          <Route path="/pedidos" element={<ListagemPedidos />} />
          <Route path="/pedidos/cadastro" element={<CadastroPedidos />} />
          <Route path="/itens" element={<ListagemItens />} />
          <Route path="/itens/cadastro" element={<CadastroItens />} />
          <Route path="/transacoes" element={<ListagemTransacoes />} />
          <Route path="/transacoes/cadastro" element={<CadastroTransacoes />} />
        </Route>
      </Routes>
    </AutenticarProvider>
  );
}

export default App;
