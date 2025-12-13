import { DataResponse } from "./base_response.type";
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    fullName: string;
    phone: string;
}

export interface LoginResponse extends DataResponse<{
    accessToken: string;
    refreshToken?: string;
}> {}

export interface UpdateStatusRequest {
    status: string;
}

export interface SentOtpRequest {
    email: string;
    purpose: string;
}

export interface ResetPasswordRequest {
    email: string;
    code: string;
    newPassword: string;
}

export interface VerifyEmailRequest extends ResetPasswordRequest{}