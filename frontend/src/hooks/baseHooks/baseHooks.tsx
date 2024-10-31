import { api } from "@/services/apiClient";
import { getToken } from "@/utils/getToken";

export async function getBase(rota: string, params: Record<string, unknown> = {}) {
    return await api.get(rota, {
        headers: { Authorization: `Bearer ${getToken}` },
        params: params
    });
}
