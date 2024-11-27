import { Transacao } from "@/interfaces/Transacao";
import { api } from "@/services/apiClient";
import { getToken } from "@/utils/getToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const postTransacao = async (data: Transacao): Promise<AxiosResponse<Transacao>> => {
    const token = getToken()
    const response = await api.post('/Transacao', data, {
        headers:{
            Authorization: `Bearer ${token}`
        }} 
    );

    return response;
};

const deleteTransacao = async (idTransacao?: number): Promise<AxiosResponse<Transacao>> => {
    const response = api.delete(`/Transacao/${idTransacao}`);
    return response;
};

const putTransacao = async (data: Transacao): Promise<AxiosResponse<Transacao>> => {
    const response = api.put('/Transacao', data);
    return response;
};


export function useTransacaoTransacaoMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postTransacao,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transacao-data'] });
        }
    });

    return mutatePost;
}

export function useTransacaoTransacaoMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteTransacao,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transacao-data'] });
        }
    });

    return mutateDelete;
}

export function useTransacaoTransacaoMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putTransacao,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transacao-data'] });
        }
    });

    return mutatePut;
}