import { BaseResponse, DataResponse } from "./base_response.type";
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
    refreshToken: string;
}> {}

export interface RegisterResponse extends BaseResponse {}