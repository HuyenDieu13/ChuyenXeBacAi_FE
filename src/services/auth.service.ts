import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/auth.type";


export const authService = {
    logIn: async (data: LoginRequest): Promise<LoginResponse> => {
        const response: AxiosResponse<LoginResponse> = await httpClient.post(API_ROUTES.auth.login, data);
        return response.data;
    },
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response: AxiosResponse<RegisterResponse> = await httpClient.post(API_ROUTES.auth.register, data);
        return response.data;
    }
};
