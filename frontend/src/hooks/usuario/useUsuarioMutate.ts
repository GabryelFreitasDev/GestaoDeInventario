import { Usuario } from "@/interfaces/Usuario";
import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";



const postUsuario = async (data: Usuario): Promise<AxiosResponse<Usuario>> => {
    const response = api.post('/Usuario', data);
    return response;
};

const deleteUsuario = async (idUsuario?: number): Promise<AxiosResponse<Usuario>> => {
    const response = api.delete(`/Usuario/${idUsuario}`);
    return response;
};

const putUsuario = async (data: Usuario): Promise<AxiosResponse<Usuario>> => {
    const response = api.put('/Usuario', data);
    return response;
};


export function useUsuarioMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postUsuario,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });
        }
    });

    return mutatePost;
}

export function useUsuarioMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteUsuario,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });
        }
    });

    return mutateDelete;
}

export function useUsuarioMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putUsuario,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });
        }
    });

    return mutatePut;
}