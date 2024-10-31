import { Produto } from "@/interfaces/Produto";
import { api } from "@/services/apiClient";
import { getToken } from "@/utils/getToken";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<Produto[]>> => {
    const token = getToken()

    const response = await api.get('/Produto', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response;
};

export function useProduto(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['produto-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}