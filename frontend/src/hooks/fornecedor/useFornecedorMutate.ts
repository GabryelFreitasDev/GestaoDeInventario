import { Fornecedor } from "@/interfaces/Fornecedor";
import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";



const postFornecedor = async (data: Fornecedor): Promise<AxiosResponse<Fornecedor>> => {
    const response = api.post('/Fornecedor', data);
    return response;
};

const deleteFornecedor = async (idFornecedor?: number): Promise<AxiosResponse<Fornecedor>> => {
    const response = api.delete(`/Fornecedor/${idFornecedor}`);
    return response;
};

const putFornecedor = async (data: Fornecedor): Promise<AxiosResponse<Fornecedor>> => {
    const response = api.put('/Fornecedor', data);
    return response;
};


export function useFornecedorFornecedorMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postFornecedor,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fornecedor-data'] });
        }
    });

    return mutatePost;
}

export function useFornecedorFornecedorMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteFornecedor,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fornecedor-data'] });
        }
    });

    return mutateDelete;
}

export function useFornecedorFornecedorMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putFornecedor,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fornecedor-data'] });
        }
    });

    return mutatePut;
}