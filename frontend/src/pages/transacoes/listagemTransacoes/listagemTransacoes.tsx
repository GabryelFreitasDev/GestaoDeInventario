import Sidebar from '@/components/Sidebar/sidebar'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Tipo para representar uma transação
type Transacao = {
  id: number;
  pedidoId: number;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  data: string;
  observacao: string;
};

// Dados de exemplo
const transacoesExemplo: Transacao[] = [
  { id: 1, pedidoId: 1, tipo: 'entrada', quantidade: 10, data: '2024-01-15', observacao: 'Entrada inicial' },
  { id: 2, pedidoId: 2, tipo: 'saida', quantidade: 5, data: '2024-01-16', observacao: 'Saída para cliente' },
  { id: 3, pedidoId: 1, tipo: 'entrada', quantidade: 8, data: '2024-01-17', observacao: 'Reposição de estoque' },
]

export function ListagemTransacoes() {
  const [transacoes] = useState<Transacao[]>(transacoesExemplo)
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<number | null>(null)
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 justify-center p-10">
        <div className="w-full max-w-[800px] bg-white p-8 rounded-lg shadow-lg">
          <main className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <h1 className="font-sans text-4xl font-bold text-gray-800">
                Listagem de Transações
              </h1>
              <p className="font-sans font-normal text-base text-gray-600">
                Gerencie as transações de entrada e saída do estoque.
              </p>
            </header>

            <div className="flex justify-between mb-6">
              <Link
                to="/transacoes/cadastro"
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-purple-400 hover:ring-1 hover:ring-purple-500 focus:ring-2 focus:ring-purple-400"
              >
                Adicionar Transação
              </Link>
              <button
                onClick={() => {/* Implementar edição */}}
                disabled={!transacaoSelecionada}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-blue-400 hover:ring-1 hover:ring-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Editar Transação
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
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">ID do Pedido</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Tipo</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Quantidade</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Data</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Observação</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((transacao) => (
                  <tr
                    key={transacao.id}
                    onClick={() => setTransacaoSelecionada(transacao.id)}
                    className={`cursor-pointer hover:bg-gray-100 ${transacaoSelecionada === transacao.id ? 'bg-purple-100' : ''}`}
                  >
                    <td className="py-2 px-4 border-b">{transacao.pedidoId}</td>
                    <td className="py-2 px-4 border-b">{transacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}</td>
                    <td className="py-2 px-4 border-b">{transacao.quantidade}</td>
                    <td className="py-2 px-4 border-b">{transacao.data}</td>
                    <td className="py-2 px-4 border-b">{transacao.observacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  )
}
