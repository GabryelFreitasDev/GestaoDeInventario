import Sidebar from '@/components/Sidebar/sidebar';
import { useClienteMutatePost } from '@/hooks/cliente/useClienteMutate';
import { Cliente } from '@/interfaces/Cliente';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function CadastroClientes() {
  const [nome, setNome] = useState('');
  const [cpf_cnpj, setCpfCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const { mutate } = useClienteMutatePost();

  async function handleClienteSubmit() {
    
    const cliente: Cliente = {
      nome: nome,
      cpf_cnpj: cpf_cnpj, 
      contato: contato,
      endereco: endereco,
    }
    console.log(cliente);
    mutate(cliente)
    
    navigate("/clientes")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col justify-center p-10">
        <div className="w-full max-w-[1000px] mx-auto bg-white p-10 rounded-lg shadow-lg">
          <main className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Cadastro de Cliente</h1>
              <p className="text-base text-gray-600">Insira as informações do cliente para adicioná-lo ao sistema.</p>
            </header>

            <form onSubmit={handleClienteSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">CPF/CNPJ</label>
                <input
                  type="text"
                  name="cpf_cnpj"
                  value={cpf_cnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Contato</label>
                <input
                  type="text"
                  name="contato"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Endereco</label>
                <input
                  type="text"
                  name="endereco"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 mt-6">
                <Link
                  to="/clientes"
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

