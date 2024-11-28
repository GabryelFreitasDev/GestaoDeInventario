import Sidebar from '@/components/Sidebar/sidebar';
import { usePedido } from '@/hooks/pedido/usePedido';
import { useProduto } from '@/hooks/produto/useProduto';
import { useTransacaoMutatePost } from '@/hooks/transacao/useTransacaoMutate';
import { Pedido } from '@/interfaces/Pedido';
import { Produto } from '@/interfaces/Produto';
import { Transacao } from '@/interfaces/Transacao';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function CadastroTransacoes() {
  const { data: pedidosList } = usePedido();
  const { data: produtosList } = useProduto();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pedidoId, setPedidoId] = useState<number | undefined>(undefined);
  const [produtoId, setProdutoId] = useState<number | undefined>(undefined);
  const [dataTransacao, setDataTransacao] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [tipo, setTipo] = useState('entrada');
  const [valor, setValor] = useState<number>(0);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { mutate } = useTransacaoMutatePost();

  useEffect(() => {
    if (pedidosList) setPedidos(pedidosList);
    if (produtosList) setProdutos(produtosList);
  }, [pedidosList, produtosList]);

  async function handleTransacaoSubmit(event: React.FormEvent) {
    event.preventDefault();
    const transacao: Transacao = {
      data: new Date(dataTransacao),
      tipo: tipo,
      valor: valor,
      produtoId: produtoId!,
      pedidoId: pedidoId!,
    };
    console.log(transacao);
    mutate(transacao, {
      onSuccess: () => navigate('/transacoes'),
    });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col justify-center p-10">
        <div className="w-full max-w-[1000px] mx-auto bg-white p-10 rounded-lg shadow-lg">
          <main className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Registro de Transação</h1>
              <p className="text-base text-gray-600">
                Registre entradas e saídas de estoque vinculadas a pedidos e produtos.
              </p>
            </header>

            <form onSubmit={handleTransacaoSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Data */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Data</label>
                <input
                  type="date"
                  value={dataTransacao}
                  onChange={(e) => setDataTransacao(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Pedido */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Pedido</label>
                <select
                  value={pedidoId}
                  onChange={(e) => setPedidoId(Number(e.target.value))}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Selecione um pedido</option>
                  {pedidos.map((pedido) => (
                    <option key={pedido.id} value={pedido.id}>
                      {pedido.id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Produto */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Produto</label>
                <select
                  value={produtoId}
                  onChange={(e) => setProdutoId(Number(e.target.value))}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Selecione um produto</option>
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de Transação */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Tipo de Transação</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Valor</label>
                <input
                  type="number"
                  name="precoUnitario" 
                  value={valor}
                  onChange={(e) => setValor(Number(e.target.value))}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Botões */}
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
