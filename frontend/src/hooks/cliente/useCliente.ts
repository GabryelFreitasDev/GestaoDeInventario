import { Cliente } from "@/interfaces/Cliente";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


const fetchData = async (): Promise<AxiosResponse<Cliente[]>> => {
    const response = await api.get('/Cliente');
    return response;
};

export function useCliente(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['cliente-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}

// Filtrando ID?

// const fetchData = async (idCliente?: number): Promise<AxiosResponse<Cliente[]>> => {
//     const endpoint = idCliente !== undefined 
//         ? `/Cliente/${idCliente}` 
//         : '/Cliente';
    
//     const response = await api.get(endpoint);
//     return response;
// };

// export function useCliente(idCliente?: number) {
//     const query = useQuery({
//         queryKey: ['cliente-data', idCliente],
//         queryFn: () => fetchData(idCliente), 
//         retry: 2,
//         enabled: idCliente !== undefined || idCliente === undefined, 
//     });

//     return {
//         ...query,
//         data: query.data?.data,
//     };
// }