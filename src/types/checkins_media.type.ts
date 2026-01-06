import { BaseResponse } from "./base_response.type";

export interface CheckinResource {
    user_id: string;
    fullName?: string;
    isPresent?: boolean;
    checkinTime?: string;
}
export interface MediaResource {
    id: string;
    url: string;
    thumb_url?: string;
    compaign_id?: string;
    uploaded_at?: string;
}
export interface CreateCheckinRequest {
    userId: string;
    sessionId: string;
    lat?: number;
    lng?: number;
}

export interface CreateMediaRequest {
    CampaignId: string;
    Url: string;
    PublicId: string;
    CheckinId?: string;
}
export type CheckinsResponse = CheckinResource[];
export interface MediasResponse extends BaseResponse {}

export type MediaLatestResponse = MediaResource[];