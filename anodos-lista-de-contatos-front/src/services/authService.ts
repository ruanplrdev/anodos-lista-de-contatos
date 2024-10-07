
import axiosInstance from "@/lib/axios";

export interface LoginRequest {
    email: string,
    password: string
}
interface LoginResponse {
    data: {token: string},
}
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

export const login = async ({email, password}:LoginRequest) => {
    const response:LoginResponse = await axiosInstance.post(`login`, {
        email, password
    });
    
    return response.data;
}

interface RegisterResponse {
    data: { message: string }; // ou outro formato que sua API retorne
}

export const registerUser = async (data: RegisterRequest): Promise<string> => {
    const response: RegisterResponse = await axiosInstance.post(`register`, data);
    return response.data.message;
};
