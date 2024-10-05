import axiosInstance from "@/lib/axios";

interface LoginRequest {
    email: string,
    password: string
}
interface LoginResponse {
    data: {token: string},
}
export const login = async ({email, password}:LoginRequest) => {
    const response:LoginResponse = await axiosInstance.post(`login`, {
        email, password
    });
    console.log("[LOG]",response);
    
    return response.data;
}