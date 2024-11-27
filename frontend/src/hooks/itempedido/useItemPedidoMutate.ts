import { ItemPedido } from "@/interfaces/ItemPedido";
import { api } from "@/services/apiClient";
import { getToken } from "@/utils/getToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const postItemPedido = async (data: ItemPedido): Promise<AxiosResponse<ItemPedido>> => {
    const token = getToken()
    const response = await api.post('/ItemPedido', data, {
        headers:{
            Authorization: `Bearer ${token}`
        }} 
    );

    return response;
};


const deleteItemPedido = async (idItemPedido?: number): Promise<AxiosResponse<ItemPedido>> => {
    const response = api.delete(`/ItemPedido/${idItemPedido}`);
    return response;
};

const putItemPedido = async (data: ItemPedido): Promise<AxiosResponse<ItemPedido>> => {
    const response = api.put('/ItemPedido', data);
    return response;
};


export function useItemPedidoItemPedidoMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postItemPedido,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['itempedido-data'] });
        }
    });

    return mutatePost;
}

export function useItemPedidoItemPedidoMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteItemPedido,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['itempedido-data'] });
        }
    });

    return mutateDelete;
}

export function useItemPedidoItemPedidoMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putItemPedido,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['itempedido-data'] });
        }
    });

    return mutatePut;
}