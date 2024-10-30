import { Cliente } from "@/interfaces/Cliente";
import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";



const postCliente = async (data: Cliente): Promise<AxiosResponse<Cliente>> => {
    const response = api.post('/Cliente', data);
    return response;
};

const deleteCliente = async (idCliente?: number): Promise<AxiosResponse<Cliente>> => {
    const response = api.delete(`/Cliente/${idCliente}`);
    return response;
};

const putCliente = async (data: Cliente): Promise<AxiosResponse<Cliente>> => {
    const response = api.put('/Cliente', data);
    return response;
};


export function useClienteClienteMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postCliente,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cliente-data'] });
        }
    });

    return mutatePost;
}

export function useClienteClienteMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteCliente,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cliente-data'] });
        }
    });

    return mutateDelete;
}

export function useClienteClienteMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putCliente,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cliente-data'] });
        }
    });

    return mutatePut;
}