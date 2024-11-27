import { FormEvent, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import * as zod from 'zod';

import logo from '../assets/logo.svg';
import { UsuarioContext } from '@/contexts/UsuarioContext';
import { toast } from 'react-toastify';

// Schema de validação
const formValidationSchema = zod.object({
  email: zod.string().email('Digite um e-mail válido'),
  password: zod.string().nonempty('Digite a sua senha'),
  nome: zod.string().min(3, 'O nome deve ter pelo menos 3 caracteres').optional(),
});

type FormData = zod.infer<typeof formValidationSchema>;

export default function Login() {
  const { login, cadastrar } = useContext(UsuarioContext);

  const [isSignUp, setIsSignUp] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formValidationSchema),
  });

  const { formState, reset } = form;
  const { errors } = formState;

  async function handleLoginSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await login({ email, senha });
      reset();
    } catch (error) {
      toast.error('Erro ao tentar realizar o login!');
      console.error(error);
    }
  }

  async function handleSignUpSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      if (!nome.trim()) {
        toast.error('O nome é obrigatório ao criar uma conta.');
        return;
      }

      await cadastrar({ nome, email, senha });
      setIsSignUp(false);
      reset();
    } catch (error) {
      toast.error('Erro ao tentar realizar o cadastro!');
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <img src={logo} alt="Vertigo" className="mb-8 mx-auto" />
        <main className="flex flex-col gap-8">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isSignUp ? 'Crie sua conta' : 'Acesse a plataforma'}
            </h1>
            <p className="text-gray-600">
              {isSignUp ? 'Inscreva-se para começar a gerenciar seus produtos.' : 'Faça login para começar a gerenciar seus produtos.'}
            </p>
          </header>
          <form
            className="flex flex-col gap-4"
            onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit}
          >
            {/* Campo Nome (só aparece se estiver criando conta) */}
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-gray-800" htmlFor="nome">
                  Nome
                </label>
                <input
                  className={clsx(
                    'px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500',
                    { 'border-red': errors.nome, 'focus:border-red': errors.nome }
                  )}
                  type="text"
                  id="nome"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                {errors.nome && (
                  <span className="text-red text-sm">{errors.nome?.message}</span>
                )}
              </div>
            )}

            {/* Campo Email */}
            <div className="flex flex-col gap-2">
              <label className="font-sans font-semibold text-sm text-gray-800" htmlFor="email">
                E-mail
              </label>
              <input
                className={clsx(
                  'px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-purple-500',
                  { 'border-red': errors.email, 'focus:border-red': errors.email }
                )}
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red text-sm">{errors.email?.message}</span>
              )}
            </div>

            {/* Campo Senha */}
            <div className="flex flex-col gap-2">
              <label className="font-sans font-semibold text-sm text-gray-800" htmlFor="password">
                Senha
              </label>
              <input
                className={clsx(
                  'px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-blue-500',
                  { 'border-red': errors.password, 'focus:border-red': errors.password }
                )}
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {errors.password && (
                <span className="text-red text-sm">{errors.password?.message}</span>
              )}
            </div>

            {/* Botão e Link */}
            <footer className="flex flex-col gap-8">
              <button className="bg-blue-500 text-white font-bold py-4 rounded outline-none hover:bg-blue-400 hover:ring-1 hover:ring-blue-500 focus:ring-2 focus:ring-blue-400">
                {isSignUp ? 'Registrar' : 'Entrar'}
              </button>
              <span className="text-gray-600">
                {isSignUp ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}
                <a
                  className="text-blue-500 hover:text-blue-400 hover:underline cursor-pointer"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? ' Fazer Login' : ' Inscreva-se'}
                </a>
              </span>
            </footer>
          </form>
        </main>
      </div>
    </div>
  );
}
