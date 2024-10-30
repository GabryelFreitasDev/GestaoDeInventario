
import { Transacao } from "@/interfaces/Transacao";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<Transacao[]>> => {
    const response = await api.get('/Transacao');
    return response;
};

export function useTransacao(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['transacao-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}