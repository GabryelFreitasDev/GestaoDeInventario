import Sidebar from '@/components/Sidebar/sidebar';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ItemPedido } from '@/interfaces/ItemPedido';
import { useProduto } from '@/hooks/produto/useProduto';
import { usePedido } from '@/hooks/pedido/usePedido';
import { Produto } from '@/interfaces/Produto';
import { Pedido } from '@/interfaces/Pedido';
import { useItemPedidoMutatePost } from '@/hooks/itempedido/useItemPedidoMutate';

export function CadastroItens() {
  const { data: pedidosList } = usePedido(); 
  const { data: produtosList } = useProduto();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pedidoId, setPedidoId] = useState<number | undefined>(undefined); 
  const [produtoId, setProdutoId] = useState<number | undefined>(undefined); 
  const [quantidade, setQuantidade] = useState(1);
  const [precoUnitario, setPrecoUnitario] = useState(0);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { mutate } = useItemPedidoMutatePost();

  useEffect(() => {
    if (pedidosList) {
      setPedidos(pedidosList);
    }
    if(produtosList){
      setProdutos(produtosList);
    }
  }, [pedidosList, produtosList]);

  async function handlePedidoSubmit(event: React.FormEvent) {
    event.preventDefault();
    const itemPedido: ItemPedido = {
      pedidoId: pedidoId!,
      produtoId: produtoId!, 
      quantidade: quantidade,
      precoUnitario: precoUnitario,
    };
    console.log(itemPedido);
    mutate(itemPedido, {
      onSuccess: () => navigate('/itens'), 
    });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col justify-center p-10">
        <div className="w-full max-w-[1000px] mx-auto bg-white p-10 rounded-lg shadow-lg">
          <main className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Adicionar Item ao Pedido</h1>
              <p className="text-base text-gray-600">Associe produtos ao pedido informando as quantidades e preços.</p>
            </header>

            <form onSubmit={handlePedidoSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Pedido</label>
                <select
                  name="pedidoId"
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

              <div>
                <label className="block text-gray-700 font-bold mb-2">Produto</label>
                <select
                  name="produtoId"
                  value={produtoId}
                  onChange={(e) => setProdutoId(Number(e.target.value))}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Selecione um produto</option>
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.descricao}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Quantidade</label>
                <input
                  type="number"
                  name="quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Preço Unitário</label>
                <input
                  type="number"
                  name="precoUnitario" 
                  value={precoUnitario}
                  onChange={(e) => setPrecoUnitario(Number(e.target.value))}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  min="0"
                  step="0.01"
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
                  Adicionar Item
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
