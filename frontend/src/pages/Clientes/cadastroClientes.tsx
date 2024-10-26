import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import * as zod from 'zod'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const clienteFormValidationSchema = zod.object({
  nome: zod.string().nonempty('Digite o nome do cliente'),
  contato: zod.string().nonempty('Digite o contato do cliente'),
  endereco: zod.string().nonempty('Digite o endereço do cliente'),
  tipoPessoa: zod.enum(['fisica', 'juridica']),
  cpfCnpj: zod.string().nonempty('Digite o CPF ou CNPJ')
    .refine((val) => {
      const numeros = val.replace(/\D/g, '');
      return numeros.length === 11 || numeros.length === 14;
    }, 'CPF deve ter 11 dígitos e CNPJ deve ter 14 dígitos')
})

type NovoClienteFormData = zod.infer<typeof clienteFormValidationSchema>

export function CadastroClientes() {
  const [tipoPessoa, setTipoPessoa] = useState<'fisica' | 'juridica'>('fisica')
  const navigate = useNavigate()

  const clienteForm = useForm<NovoClienteFormData>({
    resolver: zodResolver(clienteFormValidationSchema)
  })

  const { register, handleSubmit, formState, reset, setValue } = clienteForm

  const { errors } = formState

  useEffect(() => {
    setValue('cpfCnpj', '')
  }, [tipoPessoa, setValue])

  const handleClienteSubmit = (data: NovoClienteFormData) => {
    console.log(data)
    reset()
    navigate('/clientes')
  }

  const formatarCpfCnpj = (valor: string, tipo: 'fisica' | 'juridica') => {
    const numeros = valor.replace(/\D/g, '');
    if (tipo === 'fisica') {
      return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
    } else {
      return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
    }
  }

  const handleVoltar = () => {
    navigate('/clientes')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-[480px] px-6 py-10">
        <main className="flex flex-col gap-10">
          <header className="flex flex-col gap-4">
            <h1 className="font-sans text-4xl font-bold text-gray-800">
              Cadastro de Clientes
            </h1>
            <p className="font-sans font-normal text-base text-gray-600">
              Preencha os dados do cliente para cadastrá-lo no sistema.
            </p>
          </header>
          <form 
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleClienteSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="nome"
              >
                Nome do Cliente
              </label>
              <input
                className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500', {
                  'border-red': errors.nome,
                  'focus:border-red' : errors.nome,
                })} 
                type="text" 
                id="nome"
                placeholder="Digite o nome do cliente"
                {...register('nome')}
              />
              { errors.nome  && (
                <span className="text-red text-sm"> {errors.nome?.message} </span>)
              }
            </div>

            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="contato"
              >
                Contato
              </label>
              <input
                className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500', {
                  'border-red': errors.contato,
                  'focus:border-red' : errors.contato,
                })} 
                type="text" 
                id="contato"
                placeholder="Digite o contato do cliente"
                {...register('contato')}
              />
              { errors.contato  && (
                <span className="text-red text-sm"> {errors.contato?.message} </span>)
              }
            </div>

            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="endereco"
              >
                Endereço
              </label>
              <input
                className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500', {
                  'border-red': errors.endereco,
                  'focus:border-red' : errors.endereco,
                })} 
                type="text" 
                id="endereco"
                placeholder="Digite o endereço do cliente"
                {...register('endereco')}
              />
              { errors.endereco  && (
                <span className="text-red text-sm"> {errors.endereco?.message} </span>)
              }
            </div>

            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
              >
                Tipo de Pessoa
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    value="fisica"
                    {...register('tipoPessoa')}
                    onChange={() => setTipoPessoa('fisica')}
                    checked={tipoPessoa === 'fisica'}
                  />
                  <span className="ml-2">Física</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    value="juridica"
                    {...register('tipoPessoa')}
                    onChange={() => setTipoPessoa('juridica')}
                    checked={tipoPessoa === 'juridica'}
                  />
                  <span className="ml-2">Jurídica</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label 
                className="font-sans font-semibold text-sm text-gray-800"
                htmlFor="cpfCnpj"
              >
                {tipoPessoa === 'fisica' ? 'CPF' : 'CNPJ'}
              </label>
              <input
                className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500', {
                  'border-red': errors.cpfCnpj,
                  'focus:border-red' : errors.cpfCnpj,
                })} 
                type="text" 
                id="cpfCnpj"
                placeholder={tipoPessoa === 'fisica' ? '000.000.000-00' : '00.000.000/0001-00'}
                maxLength={tipoPessoa === 'fisica' ? 14 : 18}
                {...register('cpfCnpj', {
                  onChange: (e) => {
                    const value = e.target.value;
                    e.target.value = formatarCpfCnpj(value, tipoPessoa);
                  }
                })}
              />
              { errors.cpfCnpj  && (
                <span className="text-red text-sm"> {errors.cpfCnpj?.message} </span>)
              }
            </div>

            <footer className="flex flex-col gap-4 mt-4">
              <button
                className="bg-purple-500 text-white font-bold py-4 rounded outline-none hover:bg-purple-400 hover:ring-1 hover:ring-purple-500 focus:ring-2 focus:ring-purple-400"
                type="submit"
              >
                Cadastrar Cliente
              </button>
              <button
                className="bg-gray-300 text-gray-800 font-bold py-4 rounded outline-none hover:bg-gray-200 hover:ring-1 hover:ring-gray-300 focus:ring-2 focus:ring-gray-200"
                type="button"
                onClick={handleVoltar}
              >
                Voltar
              </button>
            </footer>
          </form>
        </main>
      </div>
    </div>
  )
}
