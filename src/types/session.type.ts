import { DataResponse, PaginationResponse } from "./base_response.type";
enum SessionStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
}

export interface SessionResource {
    id: string;
    user_id: string;
    session_id: string;
    status: SessionStatus;
    applied_at: string;
    reviewed_at?: string;
    rejected_reason?: string;
}

export interface CreateSessionRequest {
    CampaignId: string;
    Title: string;
    SessionDate: string;
    Shift: string;
    Quota: number;
    Lat: number;
    Lng: number;
}

export interface CreateRegistrationRequest {
    UserId: string;
    CampaignId: string;
    SessionId: string;
}

export interface ReviewRegistrationRequest {
    Status: SessionStatus;
    RejectedReason?: string;
}

export interface SessionResponse extends DataResponse<SessionResource[]> {}
export interface CreateSessionResponse extends DataResponse<SessionResource> {}
export interface CreateRegistrationResponse extends DataResponse<SessionResource> {}
export interface ReviewRegistrationResponse extends DataResponse<SessionResource> {}