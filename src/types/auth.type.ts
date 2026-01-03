import { DataResponse } from "./base_response.type";
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    fullName: string;
    phone: string;
}

export interface LoginResponse {
    access_token: string;
    role: string
}

export interface UpdateStatusRequest {
    status: string;
}

export interface SentOtpRequest {
    email: string;
    purpose: string;
}

export interface ResetPasswordRequest {
    tempLength: number;
    sendEmail: boolean
}

export interface VerifyEmailRequest extends ResetPasswordRequest{}
export type ResetPasswordResponse = {
    message: string;
}