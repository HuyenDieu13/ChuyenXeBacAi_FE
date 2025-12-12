import { DataResponse, PaginationResponse } from "./base_response.type";

// Exported so UI layers can share the same status source of truth
export enum SessionStatus {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING",
    ENDED = "ENDED",
}

export interface SessionResource {
    id: string;
    campaignId: string;

    title: string;
    description?: string;

    sessionDate: string; // datetime
    shift: string;       // ex: "morning" | "afternoon" | "custom"
    location: string;

    lat: number;
    lng: number;

    quota: number;          // Số lượng TNV tối đa
    volunteers: string[];   // danh sách id TNV đã duyệt

    banner?: string;
    status: SessionStatus;
    progress: number;
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

export interface SessionResponse extends DataResponse<SessionResource[]> { }
export interface CreateSessionResponse extends DataResponse<SessionResource> { }
export interface CreateRegistrationResponse extends DataResponse<SessionResource> { }
export interface ReviewRegistrationResponse extends DataResponse<SessionResource> { }