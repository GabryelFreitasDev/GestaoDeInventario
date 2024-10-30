import { Produto } from "@/interfaces/Produto";
import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";



const postProduto = async (data: Produto): Promise<AxiosResponse<Produto>> => {
    const response = api.post('/Produto', data);
    return response;
};

const deleteProduto = async (idProduto?: number): Promise<AxiosResponse<Produto>> => {
    const response = api.delete(`/Produto/${idProduto}`);
    return response;
};

const putProduto = async (data: Produto): Promise<AxiosResponse<Produto>> => {
    const response = api.put('/Produto', data);
    return response;
};


export function useProdutoProdutoMutatePost() {
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

export function useProdutoProdutoMutateDelete() {
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

export function useProdutoProdutoMutatePut() {
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