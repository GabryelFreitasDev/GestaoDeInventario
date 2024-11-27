import Sidebar from '@/components/Sidebar/sidebar';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Tipo para representar um pedido
type Pedido = {
  id: number;
  clienteId: number;
  dataPedido: string;
  status: 'pendente' | 'aprovado' | 'cancelado';
  valorTotal: number;
};

// Tipo para representar um cliente
type Cliente = {
  id: number;
  nome: string;
};

export function CadastroPedidos() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [pedido, setPedido] = useState<Pedido>({
    id: Date.now(),
    clienteId: 0,
    dataPedido: new Date().toISOString().split('T')[0],
    status: 'pendente',
    valorTotal: 0
  });
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Aqui você deve fazer uma chamada à API para buscar a lista de clientes
    // Por enquanto, vamos usar dados de exemplo
    setClientes([
      { id: 1, nome: 'Cliente 1' },
      { id: 2, nome: 'Cliente 2' },
      { id: 3, nome: 'Cliente 3' },
    ]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPedido({ ...pedido, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pedido cadastrado:', pedido);
    navigate('/pedidos');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col justify-center p-10">
        <div className="w-full max-w-[1000px] mx-auto bg-white p-10 rounded-lg shadow-lg">
          <main className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Cadastro de Pedido</h1>
              <p className="text-base text-gray-600">Insira as informações do pedido para adicioná-lo ao sistema.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Cliente</label>
                <select
                  name="clienteId"
                  value={pedido.clienteId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Data do Pedido</label>
                <input
                  type="date"
                  name="dataPedido"
                  value={pedido.dataPedido}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Status</label>
                <select
                  name="status"
                  value={pedido.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="pendente">Pendente</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Valor Total</label>
                <input
                  type="number"
                  name="valorTotal"
                  value={pedido.valorTotal}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 mt-6">
                <Link
                  to="/pedidos"
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded outline-none hover:bg-gray-400"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="bg-purple-500 text-white font-bold py-2 px-4 rounded outline-none hover:bg-purple-400 focus:ring-2 focus:ring-purple-400"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
