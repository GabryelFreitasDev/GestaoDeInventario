import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import * as zod from 'zod'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const produtoFormValidationSchema = zod.object({
  nome: zod.string().nonempty('Digite o nome do produto'),
  descricao: zod.string().nonempty('Digite a descrição do produto'),
  preco: zod.number().min(0, 'O preço deve ser maior ou igual a zero'),
  quantidade: zod.number().int().min(0, 'A quantidade deve ser um número inteiro maior ou igual a zero'),
  imagens: zod.array(zod.instanceof(File)).min(1, 'Adicione pelo menos uma imagem')
})

type NovoProdutoFormData = zod.infer<typeof produtoFormValidationSchema>

export function CadastroProdutos() {
  const [imagemPreview, setImagemPreview] = useState<string[]>([])
  const [imagensFiles, setImagensFiles] = useState<File[]>([])
  
  const produtoForm = useForm<NovoProdutoFormData>({
    resolver: zodResolver(produtoFormValidationSchema)
  })

  const { register, handleSubmit, formState, reset, setValue } = produtoForm

  const { errors } = formState

  const handleProdutoSubmit = (data: NovoProdutoFormData) => {
    console.log(data)
    reset()
    setImagemPreview([])
    setImagensFiles([])
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImagensFiles(prevFiles => [...prevFiles, ...acceptedFiles])
    setValue('imagens', [...imagensFiles, ...acceptedFiles], { shouldValidate: true })
    const newImagemPreview = acceptedFiles.map(file => URL.createObjectURL(file))
    setImagemPreview(prevPreview => [...prevPreview, ...newImagemPreview])
  }, [setValue, imagensFiles])

  const handleRemoveImage = (index: number) => {
    const newImagemPreview = [...imagemPreview]
    newImagemPreview.splice(index, 1)
    setImagemPreview(newImagemPreview)

    const newImagensFiles = [...imagensFiles]
    newImagensFiles.splice(index, 1)
    setImagensFiles(newImagensFiles)
    setValue('imagens', newImagensFiles, { shouldValidate: true })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-[480px] px-6 py-10">
        <main className="flex flex-col gap-10">
          <header className="flex flex-col gap-4">
            <h1 className="font-sans text-4xl font-bold text-gray-800">
              Cadastro de Produtos
            </h1>
            <p className="font-sans font-normal text-base text-gray-600">
              Preencha os dados do produto para cadastrá-lo no sistema.
            </p>
          </header>
          <form 
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleProdutoSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="nome"
              >
                Nome do Produto
              </label>
              <input
                className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500', {
                  'border-red': errors.nome,
                  'focus:border-red' : errors.nome,
                })} 
                type="text" 
                id="nome"
                placeholder="Digite o nome do produto"
                {...register('nome')}
              />
              { errors.nome  && (
                <span className="text-red text-sm"> {errors.nome?.message} </span>)
              }
            </div>

            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="descricao"
              >
                Descrição
              </label>
              <textarea
                className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500', {
                  'border-red': errors.descricao,
                  'focus:border-red' : errors.descricao,
                })} 
                id="descricao"
                placeholder="Digite a descrição do produto"
                {...register('descricao')}
              />
              { errors.descricao  && (
                <span className="text-red text-sm"> {errors.descricao?.message} </span>)
              }
            </div>

            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="preco"
              >
                Preço
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                <input
                  className={clsx('pl-8 pr-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500 w-full', {
                    'border-red': errors.preco,
                    'focus:border-red' : errors.preco,
                  })} 
                  type="number" 
                  id="preco"
                  step="0.01"
                  placeholder="Digite o preço do produto"
                  {...register('preco', { 
                    valueAsNumber: true,
                    setValueAs: (v) => parseFloat(v)
                  })}
                />
              </div>
              { errors.preco  && (
                <span className="text-red text-sm"> {errors.preco?.message} </span>)
              }
            </div>

            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="quantidade"
              >
                Quantidade
              </label>
              <input
                className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500', {
                  'border-red': errors.quantidade,
                  'focus:border-red' : errors.quantidade,
                })} 
                type="number" 
                id="quantidade"
                placeholder="Digite a quantidade do produto"
                {...register('quantidade', { valueAsNumber: true })}
              />
              { errors.quantidade  && (
                <span className="text-red text-sm"> {errors.quantidade?.message} </span>)
              }
            </div>

            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="imagens"
              >
                Imagens do Produto
              </label>
              <div {...getRootProps()} className="flex items-center justify-center w-full">
                <label htmlFor="imagens" className={clsx("flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100", {
                  "border-purple-500": isDragActive
                })}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para fazer upload</span> ou arraste e solte</p>
                    <p className="text-xs text-gray-500">PNG, JPG ou GIF (MAX. 800x400px)</p>
                  </div>
                  <input {...getInputProps()} />
                </label>
              </div>
              { errors.imagens  && (
                <span className="text-red text-sm"> {errors.imagens?.message} </span>)
              }
              {imagemPreview.length > 0 && (
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
              )}
            </div>

            <footer className="flex flex-col gap-8 mt-4">
              <button
                className="bg-purple-500 text-white font-bold py-4 rounded outline-none hover:bg-purple-400 hover:ring-1 hover:ring-purple-500 focus:ring-2 focus:ring-purple-400"
                type="submit"
              >
                Cadastrar Produto
              </button>
            </footer>
          </form>
        </main>
      </div>
    </div>
  )
}
