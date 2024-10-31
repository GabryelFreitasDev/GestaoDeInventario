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
        </Route>
      </Routes>
    </AutenticarProvider>
  );
}

export default App;
