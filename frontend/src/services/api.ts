import axios, { AxiosError } from 'axios';
import { AutenticarTokenError } from './errors/AutenticarTokenError';
import Cookies from 'js-cookie';

export function setupAPIClient() {
    const api = axios.create({
        baseURL: 'http://localhost:3333'
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
               //deslogar();  
            } else {
                return Promise.reject(new AutenticarTokenError());
            }
        }
        return Promise.reject(error);
    });

    return api;
}

function deslogar() {
    Cookies.remove('@autenticar.token'); 
    window.location.href = '/'; 
  }