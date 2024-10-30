
import { ItemPedido } from "@/interfaces/ItemPedido";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


const fetchData = async (): Promise<AxiosResponse<ItemPedido[]>> => {
    const response = await api.get('/ItemPedido');
    return response;
};

export function useItemPedido(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['itempedido-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}