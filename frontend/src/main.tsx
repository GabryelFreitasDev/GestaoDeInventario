import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { CadastroProdutos } from './pages/Produtos/cadastroProdutos'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CadastroProdutos />
  </React.StrictMode>,
)
