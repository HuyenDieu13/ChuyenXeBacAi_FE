import { DataResponse, PaginationResponse } from "./base_response.type";
import { CampaignStatus } from "@/enum/status.enum";
export interface CampaignResource {
    id: string;
    title: string;
    goal_amount: number;
    collected_amount: number;
    status: CampaignStatus;
    created_at: string;
}

export interface CreateCampaignRequest {
    Title: string;
    Description: string;
    StartDate?: string;
    EndDate?: string;
    GoalAmount?: number;
    GoalVolunteers?: number;
}

export interface UpdateCampaignStatusRequest {
    status: CampaignStatus;
}

export interface CampaignResponse extends DataResponse<CampaignResource> {}
export interface CampaignPaginatedResponse extends PaginationResponse<CampaignResource[]> {}
export interface CreateCampaignResponse extends DataResponse<CampaignResource> {}
export interface UpdateCampaignStatusResponse extends DataResponse<CampaignResource> {}