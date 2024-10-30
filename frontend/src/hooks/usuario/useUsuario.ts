import { Usuario } from "@/interfaces/Usuario";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


const fetchData = async (): Promise<AxiosResponse<Usuario[]>> => {
    const response = await api.get('/Usuario');
    return response;
};

export function useUsuario(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['usuario-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}