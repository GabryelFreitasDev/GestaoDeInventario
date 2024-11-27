import { Pedido } from "@/interfaces/Pedido";
import { api } from "@/services/apiClient";
import { getToken } from "@/utils/getToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const postPedido = async (data: Pedido): Promise<AxiosResponse<Pedido>> => {
    const token = getToken()
    const response = await api.post('/Pedido', data, {
        headers:{
            Authorization: `Bearer ${token}`
        }} 
    );

    return response;
};

const deletePedido = async (idPedido?: number): Promise<AxiosResponse<Pedido>> => {
    const response = api.delete(`/Pedido/${idPedido}`);
    return response;
};

const putPedido = async (data: Pedido): Promise<AxiosResponse<Pedido>> => {
    const response = api.put('/Pedido', data);
    return response;
};


export function usePedidoPedidoMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postPedido,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pedido-data'] });
        }
    });

    return mutatePost;
}

export function usePedidoPedidoMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deletePedido,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pedido-data'] });
        }
    });

    return mutateDelete;
}

export function usePedidoPedidoMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putPedido,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pedido-data'] });
        }
    });

    return mutatePut;
}