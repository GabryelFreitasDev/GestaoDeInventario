import Sidebar from '@/components/Sidebar/sidebar'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Tipo para representar um pedido
type Pedido = {
  id: number;
  clienteId: number;
  dataPedido: string;
  status: 'pendente' | 'aprovado' | 'cancelado';
  valorTotal: number;
};

// Dados de exemplo
const pedidosExemplo: Pedido[] = [
  { id: 1, clienteId: 1, dataPedido: '2024-01-15', status: 'pendente', valorTotal: 1500.00 },
  { id: 2, clienteId: 2, dataPedido: '2024-01-16', status: 'aprovado', valorTotal: 2300.50 },
  { id: 3, clienteId: 1, dataPedido: '2024-01-17', status: 'cancelado', valorTotal: 800.00 },
]

export function ListagemPedidos() {
  const [pedidos] = useState<Pedido[]>(pedidosExemplo)
  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(null)
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 justify-center p-10">
        <div className="w-full max-w-[800px] bg-white p-8 rounded-lg shadow-lg">
          <main className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <h1 className="font-sans text-4xl font-bold text-gray-800">
                Listagem de Pedidos
              </h1>
              <p className="font-sans font-normal text-base text-gray-600">
                Gerencie os pedidos cadastrados no sistema.
              </p>
            </header>

            <div className="flex justify-between mb-6">
              <Link
                to="/pedidos/cadastro"
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-purple-400 hover:ring-1 hover:ring-purple-500 focus:ring-2 focus:ring-purple-400"
              >
                Adicionar Pedido
              </Link>
              <button
                onClick={() => {/* Implementar edição */}}
                disabled={!pedidoSelecionado}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-blue-400 hover:ring-1 hover:ring-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Editar Pedido
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
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">ID</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Cliente ID</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Data do Pedido</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Status</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr
                    key={pedido.id}
                    onClick={() => setPedidoSelecionado(pedido.id)}
                    className={`cursor-pointer hover:bg-gray-100 ${pedidoSelecionado === pedido.id ? 'bg-purple-100' : ''}`}
                  >
                    <td className="py-2 px-4 border-b">{pedido.id}</td>
                    <td className="py-2 px-4 border-b">{pedido.clienteId}</td>
                    <td className="py-2 px-4 border-b">{pedido.dataPedido}</td>
                    <td className="py-2 px-4 border-b">{pedido.status}</td>
                    <td className="py-2 px-4 border-b">R$ {pedido.valorTotal.toFixed(2)}</td>
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