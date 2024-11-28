import Sidebar from '@/components/Sidebar/sidebar';
import { useCliente } from '@/hooks/cliente/useCliente';
import { usePedidoMutatePost } from '@/hooks/pedido/usePedidoMutate';
import { Cliente } from '@/interfaces/Cliente';
import { Pedido } from '@/interfaces/Pedido';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function CadastroPedidos() {
  const { data } = useCliente(); 
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState<number | undefined>(undefined); 
  const [dataPedido, setDataPedido] = useState<string>(new Date().toISOString().substring(0, 10)); 
  const [status, setStatus] = useState('pendente');
  const [valorTotal, setValorTotal] = useState('');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { mutate } = usePedidoMutatePost();

  useEffect(() => {
    if (data) {
      setClientes(data);
    }
  }, [data]);

  async function handlePedidoSubmit(event: React.FormEvent) {
    event.preventDefault();
    const pedido: Pedido = {
      clienteId: clienteId!,
      data: new Date(dataPedido), 
      status: status,
      total: parseFloat(valorTotal),
    };
    console.log(pedido);
    mutate(pedido, {
      onSuccess: () => navigate('/pedidos'), 
    });
  }

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

            <form onSubmit={handlePedidoSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Cliente</label>
                <select
                  name="clienteId"
                  value={clienteId ?? ''}
                  onChange={(e) => setClienteId(Number(e.target.value))}
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
                  value={dataPedido}
                  onChange={(e) => setDataPedido(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Status</label>
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
                  value={valorTotal}
                  onChange={(e) => setValorTotal(e.target.value)}
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
