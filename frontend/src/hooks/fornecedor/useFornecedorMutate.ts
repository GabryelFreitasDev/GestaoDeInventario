import { Fornecedor } from "@/interfaces/Fornecedor";
import { api } from "@/services/apiClient";
import { getToken } from "@/utils/getToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const postFornecedor = async (data: Fornecedor): Promise<AxiosResponse<Fornecedor>> => {
    const token = getToken()
    const response = await api.post('/Fornecedor', data, {
        headers:{
            Authorization: `Bearer ${token}`
        }} 
    );

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


export function useFornecedorMutatePost() {
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

export function useFornecedorMutateDelete() {
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

export function useFornecedorMutatePut() {
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