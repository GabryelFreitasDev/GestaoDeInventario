import { Cliente } from "@/interfaces/Cliente";
import { api } from "@/services/apiClient";
import { getToken } from "@/utils/getToken";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<Cliente[]>> => {
    const token = getToken()

    const response = await api.get('/Cliente', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response;
};

export function useCliente(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['cliente-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}