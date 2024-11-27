import Sidebar from '@/components/Sidebar/sidebar'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ItemPedido } from '@/interfaces/ItemPedido'

// Dados de exemplo
const itensExemplo: ItemPedido[] = [
  { id: 1, pedidoId: 1, produtoId: 1, quantidade: 2, precoUnitario: 50.00 },
  { id: 2, pedidoId: 1, produtoId: 2, quantidade: 1, precoUnitario: 100.00 },
  { id: 3, pedidoId: 2, produtoId: 3, quantidade: 3, precoUnitario: 25.00 }
]

export function ListagemItens() {
  const [itens] = useState<ItemPedido[]>(itensExemplo)
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null)
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 justify-center p-10">
        <div className="w-full max-w-[800px] bg-white p-8 rounded-lg shadow-lg">
          <main className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <h1 className="font-sans text-4xl font-bold text-gray-800">
                Listagem de Itens
              </h1>
              <p className="font-sans font-normal text-base text-gray-600">
                Gerencie os itens dos pedidos cadastrados no sistema.
              </p>
            </header>

            <div className="flex justify-between mb-6">
              <Link
                to="/itens/cadastro"
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-purple-400 hover:ring-1 hover:ring-purple-500 focus:ring-2 focus:ring-purple-400"
              >
                Adicionar Item
              </Link>
              <button
                onClick={() => {/* Implementar edição */}}
                disabled={!itemSelecionado}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-blue-400 hover:ring-1 hover:ring-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Editar Item
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
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">ID do Produto</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Quantidade</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Preço Unitário</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setItemSelecionado(item.id ?? null)}
                    className={`cursor-pointer hover:bg-gray-100 ${itemSelecionado === item.id ? 'bg-purple-100' : ''}`}
                  >
                    <td className="py-2 px-4 border-b">{item.pedidoId}</td>
                    <td className="py-2 px-4 border-b">{item.produtoId}</td>
                    <td className="py-2 px-4 border-b">{item.quantidade}</td>
                    <td className="py-2 px-4 border-b">R$ {item.precoUnitario.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</td>
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
