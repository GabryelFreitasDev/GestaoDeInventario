import { useState } from 'react'
import { Link } from 'react-router-dom'

// Tipo para representar um cliente
type Cliente = {
  id: number
  nome: string
  contato: string
  tipoPessoa: 'fisica' | 'juridica'
  cpfCnpj: string
}

// Dados de exemplo
const clientesExemplo: Cliente[] = [
  { id: 1, nome: 'João Silva', contato: '(11) 99999-9999', tipoPessoa: 'fisica', cpfCnpj: '123.456.789-00' },
  { id: 2, nome: 'Empresa XYZ', contato: '(11) 88888-8888', tipoPessoa: 'juridica', cpfCnpj: '12.345.678/0001-00' },
]

export function ListagemClientes() {
  const [clientes] = useState<Cliente[]>(clientesExemplo)
  const [clienteSelecionado, setClienteSelecionado] = useState<number | null>(null)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-[800px] px-6 py-10">
        <main className="flex flex-col gap-10">
          <header className="flex flex-col gap-4">
            <h1 className="font-sans text-4xl font-bold text-gray-800">
              Listagem de Clientes
            </h1>
            <p className="font-sans font-normal text-base text-gray-600">
              Gerencie os clientes cadastrados no sistema.
            </p>
          </header>

          <div className="flex justify-between mb-4">
            <Link
              to="/clientes/cadastro"
              className="bg-purple-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-purple-400 hover:ring-1 hover:ring-purple-500 focus:ring-2 focus:ring-purple-400"
            >
              Adicionar Cliente
            </Link>
            <button
              onClick={() => {/* Implementar edição */}}
              disabled={!clienteSelecionado}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-blue-400 hover:ring-1 hover:ring-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Editar Cliente
            </button>
            <button
              onClick={() => {/* Implementar relatório */}}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-green-400 hover:ring-1 hover:ring-green-500 focus:ring-2 focus:ring-green-400"
            >
              Gerar Relatório
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nome</th>
                <th className="py-2 px-4 border-b">Contato</th>
                <th className="py-2 px-4 border-b">Tipo</th>
                <th className="py-2 px-4 border-b">CPF/CNPJ</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr
                  key={cliente.id}
                  onClick={() => setClienteSelecionado(cliente.id)}
                  className={`cursor-pointer hover:bg-gray-100 ${clienteSelecionado === cliente.id ? 'bg-purple-100' : ''}`}
                >
                  <td className="py-2 px-4 border-b">{cliente.nome}</td>
                  <td className="py-2 px-4 border-b">{cliente.contato}</td>
                  <td className="py-2 px-4 border-b">{cliente.tipoPessoa === 'fisica' ? 'Física' : 'Jurídica'}</td>
                  <td className="py-2 px-4 border-b">{cliente.cpfCnpj}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  )
}
