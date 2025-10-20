import { BaseResponse } from "./base_response.type";

export interface CheckinResource {
}
export interface MediaResource {
}
export interface CreateCheckinRequest {
    SessionId: string;
    UserId: string;
    Method: string;
    Lat?: number;
    Lng?: number;
}

export interface CreateMediaRequest {
    CampaignId: string;
    Url: string;
    PublicId: string;
    CheckinId?: string;
}
export interface CheckinsResponse extends BaseResponse {}
export interface MediasResponse extends BaseResponse {}
export interface CreateCheckinResponse extends BaseResponse {}
export interface CreateMediaResponse extends BaseResponse {}