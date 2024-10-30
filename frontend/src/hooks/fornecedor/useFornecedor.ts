import { Fornecedor } from "@/interfaces/Fornecedor";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


const fetchData = async (): Promise<AxiosResponse<Fornecedor[]>> => {
    const response = await api.get('/Fornecedor');
    return response;
};

export function useFornecedor(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['fornecedor-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}