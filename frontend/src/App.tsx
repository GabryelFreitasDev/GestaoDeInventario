import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login  from './pages/login'; 
import Dashboard  from './pages/dashboard'; 
import { CadastroProdutos } from './pages/Produtos/cadastroProdutos';
import { ListagemClientes } from './pages/Clientes/listagemClientes';
import { CadastroClientes } from './pages/Clientes/cadastroClientes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/produtos" element={<CadastroProdutos />} />
        <Route path="/clientes" element={<ListagemClientes />} />  
        <Route path="/clientes/cadastro" element={<CadastroClientes />} />  
      </Routes>
    </Router>
  );
}

export default App;


