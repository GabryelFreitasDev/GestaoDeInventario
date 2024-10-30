
import { Pedido } from "@/interfaces/Pedido";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


const fetchData = async (): Promise<AxiosResponse<Pedido[]>> => {
    const response = await api.get('/Pedido');
    return response;
};

export function usePedido(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['pedido-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}