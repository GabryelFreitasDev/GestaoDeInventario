import Sidebar from '@/components/Sidebar/sidebar';
import { useProduto } from '@/hooks/produto/useProduto';
import {  useState } from 'react';
import { Link } from 'react-router-dom';


export function ListagemProdutos() {
  const { data } = useProduto();
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | null>(null);
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 justify-center p-10">
        <div className="w-full max-w-[800px] bg-white p-8 rounded-lg shadow-lg">
          <main className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <h1 className="font-sans text-4xl font-bold text-gray-800">Listagem de Produtos</h1>
              <p className="font-sans font-normal text-base text-gray-600">
                Gerencie os produtos disponíveis no sistema.
              </p>
            </header>

            <div className="flex justify-between mb-6">
              <Link
                to="/produtos/cadastro"
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-purple-400 hover:ring-1 hover:ring-purple-500 focus:ring-2 focus:ring-purple-400"
              >
                Adicionar Produto
              </Link>
              <button
                onClick={() => {/* Implementar edição */}}
                disabled={!produtoSelecionado}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-blue-400 hover:ring-1 hover:ring-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Editar Produto
              </button>
              <button
                onClick={() => {/* Implementar relatório */}}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-green-400 hover:ring-1 hover:ring-green-500 focus:ring-2 focus:ring-green-400"
              >
                Gerar Relatório
              </button>
            </div>

            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Nome</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Descrição</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Preço</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((produto) => (
                  <tr
                    key={produto.id}
                    onClick={() => setProdutoSelecionado(produto.id ?? 1)}
                    className={`cursor-pointer hover:bg-gray-100 ${produtoSelecionado === produto.id ? 'bg-purple-100' : ''}`}
                  >
                    <td className="py-2 px-4 border-b">{produto.nome}</td>
                    <td className="py-2 px-4 border-b">{produto.descricao}</td>
                    <td className="py-2 px-4 border-b">R$ {produto.preco}</td>
                    <td className="py-2 px-4 border-b">{produto.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  );
}
