import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
    LoginRequest, 
    LoginResponse, 
    RegisterRequest, 
    VerifyEmailRequest, 
    SentOtpRequest, 
    ResetPasswordRequest, 
    UpdateStatusRequest,
    ResetPasswordResponse
} from "@/types/auth.type";
import { BaseResponse } from "@/types/base_response.type";


export const authService = {
    logIn: async (data: LoginRequest): Promise<LoginResponse> => {
        const response: AxiosResponse<LoginResponse> = await httpClient.post(API_ROUTES.auth.login, data);
        return response.data;
    },
    register: async (data: RegisterRequest): Promise<BaseResponse> => {
        const response: AxiosResponse<BaseResponse> = await httpClient.post(API_ROUTES.auth.register, data);
        return response.data;
    },
    updateStatus: async (id: string, data: UpdateStatusRequest) : Promise<BaseResponse> => {
        const response: AxiosResponse<BaseResponse> = await httpClient.patch(API_ROUTES.auth.updateStatus(id), data);
        return response.data;
    },
    sendOtp: async (data: SentOtpRequest): Promise<BaseResponse> => {
        const response: AxiosResponse<BaseResponse> = await httpClient.post(API_ROUTES.auth.sendOtp, data);
        return response.data;
    },
    resetPassword: async (id: string, data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
        const response: AxiosResponse<ResetPasswordResponse> = await httpClient.post(API_ROUTES.auth.resetPassword(id), data);
        return response.data;
    },
    verifyEmail: async (data: VerifyEmailRequest): Promise<BaseResponse> => {
        const response: AxiosResponse<BaseResponse> = await httpClient.post(API_ROUTES.auth.verifyEmail, data);
        return response.data;
    },
};
