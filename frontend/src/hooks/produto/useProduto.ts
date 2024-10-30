import { Produto } from "@/interfaces/Produto";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<Produto[]>> => {
    const response = await api.get('/Produto');
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