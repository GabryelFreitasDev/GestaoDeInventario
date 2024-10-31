import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import * as zod from 'zod';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Sidebar from '@/components/Sidebar/sidebar';
import { Produto } from '@/interfaces/Produto';
import { useProdutoMutatePost } from '@/hooks/produto/useProdutoMutate';
import { useNavigate } from 'react-router-dom';

const produtoFormValidationSchema = zod.object({
  nome: zod.string().nonempty('Digite o nome do produto'),
  descricao: zod.string().nonempty('Digite a descrição do produto'),
  preco: zod.number().min(0, 'O preço deve ser maior ou igual a zero'),
  quantidade: zod.number().int().min(0, 'A quantidade deve ser um número inteiro maior ou igual a zero'),
  imagens: zod.array(zod.instanceof(Uint8Array)).min(1, 'Adicione pelo menos uma imagem')
});

type NovoProdutoFormData = zod.infer<typeof produtoFormValidationSchema>;

export function CadastroProdutos() {
  //const id = data?.id;
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [imagens, setImagens] = useState<Uint8Array[]>([]);
  const [imagemPreview, setImagemPreview] = useState<string[]>([]);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const produtoForm = useForm<NovoProdutoFormData>({
    resolver: zodResolver(produtoFormValidationSchema)
  });

  const { mutate } = useProdutoMutatePost();

  const { formState, setValue } = produtoForm;
  const { errors } = formState;

  async function handleProdutoSubmit() {
    
    const produto: Produto = {
      nome: nome,
      descricao: descricao, 
      preco: preco,
      quantidade: quantidade,
      imagem: btoa(String.fromCharCode(...imagens[0])),
      fornecedorId: 1
    }
    console.log(produto);
    mutate(produto)

    navigate("/produtos")
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newImagens: Uint8Array[] = [];
    const newImagemPreview: string[] = [];

    for (const file of acceptedFiles) {
      const arrayBuffer = await file.arrayBuffer();
      newImagens.push(new Uint8Array(arrayBuffer));
      newImagemPreview.push(URL.createObjectURL(file));
    }

    setImagens((prevImagens) => [...prevImagens, ...newImagens]);
    setImagemPreview((prevPreview) => [...prevPreview, ...newImagemPreview]);
    setValue('imagens', [...imagens, ...newImagens], { shouldValidate: true });
  }, [setValue, imagens]);

  const handleRemoveImage = (index: number) => {
    const newImagemPreview = [...imagemPreview];
    newImagemPreview.splice(index, 1);
    setImagemPreview(newImagemPreview);

    const newImagens = [...imagens];
    newImagens.splice(index, 1);
    setImagens(newImagens);
    setValue('imagens', newImagens, { shouldValidate: true });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col justify-center items-center p-10">
        <div className="w-full max-w-[1000px] bg-white p-10 rounded-lg shadow-lg">
          <main className="flex flex-col gap-8">
            <header className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Cadastro de Produtos</h1>
              <p className="text-base text-gray-600">Preencha os dados do produto para cadastrá-lo no sistema.</p>
            </header>

            <form onSubmit={handleProdutoSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-800" htmlFor="nome">Nome do Produto</label>
                <input
                  className={clsx('px-4 py-3 text-sm border rounded outline-none focus:ring-2 focus:ring-purple-500', {
                    'border-red-500': errors.nome,
                  })}
                  type="text"
                  id="nome"
                  placeholder="Digite o nome do produto"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-800" htmlFor="descricao">Descrição</label>
                <textarea
                  className={clsx('px-4 py-3 text-sm border rounded outline-none focus:ring-2 focus:ring-purple-500', {
                    'border-red-500': errors.descricao,
                  })}
                  id="descricao"
                  placeholder="Digite a descrição do produto"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-800" htmlFor="preco">Preço</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                  <input
                    className={clsx('pl-8 pr-4 py-3 text-sm border rounded outline-none focus:ring-2 focus:ring-purple-500 w-full', {
                      'border-red-500': errors.preco,
                    })}
                    type="number"
                    id="preco"
                    step="0.01"
                    placeholder="Digite o preço do produto"
                    value={preco}
                    onChange={(e) => setPreco(Number(e.target.value))}
                  />
                </div>
                {errors.preco && <span className="text-red-500 text-sm">{errors.preco.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-800" htmlFor="quantidade">Quantidade</label>
                <input
                  className={clsx('px-4 py-3 text-sm border rounded outline-none focus:ring-2 focus:ring-purple-500', {
                    'border-red-500': errors.quantidade,
                  })}
                  type="number"
                  id="quantidade"
                  placeholder="Digite a quantidade do produto"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                />
                {errors.quantidade && <span className="text-red-500 text-sm">{errors.quantidade.message}</span>}
              </div>

              <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-800" htmlFor="imagens">Imagens do Produto</label>
                <div {...getRootProps()} className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <input {...getInputProps()} />
                  <p className="text-gray-500 text-center">Clique ou arraste para adicionar imagens (PNG, JPG, GIF)</p>
                </div>
                {errors.imagens && <span className="text-red-500 text-sm">{errors.imagens.message}</span>}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {imagemPreview.map((src, index) => (
                    <div key={index} className="relative">
                      <img src={src} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-purple-500 text-white font-bold py-3 px-6 rounded outline-none hover:bg-purple-400 focus:ring-2 focus:ring-purple-400"
                >
                  Cadastrar Produto
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
