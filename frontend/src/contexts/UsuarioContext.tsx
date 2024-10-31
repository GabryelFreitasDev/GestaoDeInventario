import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type UsuarioContextData = {
    usuario: UsuarioProps | undefined;
    estaAutenticado: boolean;
    login: (creditials: LoginProps) => Promise<void>;
    deslogar: () => void;
    cadastrar: (creditials: CadastroProps) => Promise<void>;
}

type UsuarioProps = {
    idusuario: string;
    nome: string;
    email: string;
    token: string;
}

type LoginProps = {
    email: string;
    senha: string;
}

type CadastroProps = {
    nome: string;
    email: string;
    senha: string;
}

type AutenticarProviderProps = {
    children:
    ReactNode;
}

export const UsuarioContext = createContext({} as UsuarioContextData);

export function AutenticarProvider({ children }: AutenticarProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioProps>();
    const estaAutenticado = !!usuario;
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario?.idusuario) {
            api.get('/Usuario/AutenticarUsuario', { params: { idusuario: usuario?.idusuario } }).then((response) => {
                const { idusuario, nome, email, token } = response.data;
                setUsuario({ idusuario, nome, email, token });
            }).catch(() => {
                deslogar();
            });
        }
    }, []);

    async function login(loginProps: LoginProps) {
        try {
            const response = await api.post('/Usuario/AutenticarUsuario', { email: loginProps.email, senha: loginProps.senha });
            const { idusuario, nome, email, token } = response.data;

            Cookies.set("@autenticar.token", token, {
                expires: 30,
                path: "/"
            });

            setUsuario({ idusuario, nome, email, token });

            navigate('/dashboard');
            toast.success(`Bem vindo ${nome}, como posso te ajudar hoje?`, { pauseOnHover: false });

        } catch (error) {
            console.log(error);
            toast.error('Usuário ou senha incorretos!');
        }
    }

    async function deslogar() {
        try {
            Cookies.remove('@autenticar.token');
            setUsuario(undefined);
            navigate('/');
        } catch (error) {
            console.log("Erro ao deslogar: " + error);
        }
    }

    async function cadastrar({ nome, email, senha }: CadastroProps) {
        try {
            await api.post('/Usuario', { nome, email, senha });
            toast.success('Usuário cadastrado com sucesso!');
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar usuário!');
        }
    }

    return (
        <UsuarioContext.Provider value={{ usuario, estaAutenticado, login, deslogar, cadastrar }}>
            {children}
        </UsuarioContext.Provider>
    );
}

