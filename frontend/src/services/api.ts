import axios, { AxiosError } from 'axios';
import { AutenticarTokenError } from './errors/AutenticarTokenError';

export function setupAPIClient() {
    const api = axios.create({
        baseURL: 'http://localhost:3333'
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
               console.log("Não")// deslogar();  // Usando deslogar passado como argumento
            } else {
                return Promise.reject(new AutenticarTokenError());
            }
        }
        return Promise.reject(error);
    });

    return api;
}

// function deslogar() {
//     Cookies.remove('@autenticar.token'); // Remove o token
//     window.location.href = '/'; // Redireciona para a página de login
//   }