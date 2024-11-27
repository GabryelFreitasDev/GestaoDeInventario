import Sidebar from '@/components/Sidebar/sidebar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Tipo para representar um fornecedor
type Fornecedor = {
  id: number;
  nome: string;
  contato: string;
  endereco: string;
};

export function CadastroFornecedores() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [fornecedor, setFornecedor] = useState<Fornecedor>({
    id: Date.now(),
    nome: '',
    contato: '',
    endereco: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFornecedor({ ...fornecedor, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Fornecedor cadastrado:', fornecedor);
    navigate('/fornecedores');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col justify-center p-10">
        <div className="w-full max-w-[1000px] mx-auto bg-white p-10 rounded-lg shadow-lg">
          <main className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Cadastro de Fornecedor</h1>
              <p className="text-base text-gray-600">Insira as informações do fornecedor para adicioná-lo ao sistema.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={fornecedor.nome}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Contato</label>
                <input
                  type="text"
                  name="contato"
                  value={fornecedor.contato}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  value={fornecedor.endereco}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 mt-6">
                <Link
                  to="/fornecedores"
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
