import Sidebar from '@/components/Sidebar/sidebar';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Tipo para representar uma transação
type Transacao = {
  id: number;
  pedidoId: number;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  data: string;
  observacao: string;
};

// Tipo para representar um pedido
type Pedido = {
  id: number;
  clienteNome: string;
  dataPedido: string;
};

export function CadastroTransacoes() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [transacao, setTransacao] = useState<Transacao>({
    id: Date.now(),
    pedidoId: 0,
    tipo: 'entrada',
    quantidade: 0,
    data: new Date().toISOString().split('T')[0],
    observacao: ''
  });
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    // Aqui você deve fazer uma chamada à API para buscar a lista de pedidos
    // Por enquanto, vamos usar dados de exemplo
    setPedidos([
      { id: 1, clienteNome: 'Cliente 1', dataPedido: '2024-01-15' },
      { id: 2, clienteNome: 'Cliente 2', dataPedido: '2024-01-16' },
      { id: 3, clienteNome: 'Cliente 3', dataPedido: '2024-01-17' },
    ]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTransacao({ ...transacao, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Transação registrada:', transacao);
    navigate('/transacoes');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col justify-center p-10">
        <div className="w-full max-w-[1000px] mx-auto bg-white p-10 rounded-lg shadow-lg">
          <main className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Registro de Transação</h1>
              <p className="text-base text-gray-600">Registre entradas e saídas de estoque baseadas em pedidos.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Pedido</label>
                <select
                  name="pedidoId"
                  value={transacao.pedidoId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Selecione um pedido</option>
                  {pedidos.map((pedido) => (
                    <option key={pedido.id} value={pedido.id}>
                      {`Pedido ${pedido.id} - ${pedido.clienteNome} (${pedido.dataPedido})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Tipo de Transação</label>
                <select
                  name="tipo"
                  value={transacao.tipo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Quantidade</label>
                <input
                  type="number"
                  name="quantidade"
                  value={transacao.quantidade}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Data</label>
                <input
                  type="date"
                  name="data"
                  value={transacao.data}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Observação</label>
                <textarea
                  name="observacao"
                  value={transacao.observacao}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 mt-6">
                <Link
                  to="/transacoes"
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded outline-none hover:bg-gray-400"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="bg-purple-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-purple-400 focus:ring-2 focus:ring-purple-400"
                >
                  Registrar
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

