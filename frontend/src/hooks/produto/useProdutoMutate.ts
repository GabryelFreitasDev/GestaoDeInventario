import { Produto } from "@/interfaces/Produto";
import { api } from "@/services/apiClient";
import { getToken } from "@/utils/getToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const postProduto = async (data: Produto): Promise<AxiosResponse<Produto>> => {
    const token = getToken()
    const response = await api.post('/Produto', data, {
        headers:{
            Authorization: `Bearer ${token}`
        }} 
    );

        console.log(response);
    return response;
};

const deleteProduto = async (idProduto?: number): Promise<AxiosResponse<Produto>> => {
    const response = await api.delete(`/Produto/${idProduto}`);
    return response;
};

const putProduto = async (data: Produto): Promise<AxiosResponse<Produto>> => {
    const response = await api.put('/Produto', data);
    return response;
};


export function useProdutoMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postProduto,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['produto-data'] });
        }
    });

    return mutatePost;
}

export function useProdutoMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteProduto,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['produto-data'] });
        }
    });

    return mutateDelete;
}

export function useProdutoMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putProduto,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['produto-data'] });
        }
    });

    return mutatePut;
}