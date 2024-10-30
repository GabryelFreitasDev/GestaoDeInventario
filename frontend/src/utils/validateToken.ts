import { api } from "@/services/apiClient";
import { getToken } from "./getToken";

export default async function validateToken() {
    const token = getToken()
    if (!token) return false;

    try {
        await api.get("/Usuario", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}