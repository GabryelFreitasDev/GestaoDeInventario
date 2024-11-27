import Sidebar from '@/components/Sidebar/sidebar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ItemPedido } from '@/interfaces/ItemPedido';

export function CadastroItens() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [itemPedido, setItemPedido] = useState<ItemPedido>({
    pedidoId: 0,
    produtoId: 0,
    quantidade: 0,
    precoUnitario: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItemPedido({ ...itemPedido, [name]: name === 'quantidade' || name === 'precoUnitario' ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Item de pedido cadastrado:', itemPedido);
    navigate('/pedidos');
  };

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

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Pedido</label>
                <select
                  name="pedidoId"
                  value={itemPedido.pedidoId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Selecione um pedido</option>
                  {/* Opções de pedidos serão adicionadas aqui */}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Produto</label>
                <select
                  name="produtoId"
                  value={itemPedido.produtoId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Selecione um produto</option>
                  {/* Opções de produtos serão adicionadas aqui */}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Quantidade</label>
                <input
                  type="number"
                  name="quantidade"
                  value={itemPedido.quantidade}
                  onChange={handleInputChange}
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
                  value={itemPedido.precoUnitario}
                  onChange={handleInputChange}
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
