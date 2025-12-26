import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
    CampaignResponse, 
    CampaignDetailResponse,
    CreateCampaignRequest, 
    UpdateCampaignStatusRequest, 
} from "@/types/campaign.type";

export const campaignService = {
    getCampaigns: async (params: { 
        // pageIndex?: number; 
        // pageSize?: number; 
        // searchText?: string 
        q?: string
        }
    ): Promise<CampaignResponse> => {
        const response: AxiosResponse<CampaignResponse> = await httpClient.get(API_ROUTES.campaigns.getCampaigns(params));
        return response.data;
    },
    getCampaignById: async (id: string): Promise<CampaignDetailResponse> => {
        const response: AxiosResponse<CampaignDetailResponse> = await httpClient.get(API_ROUTES.campaigns.getCampaignById(id));
        return response.data;
    },
    createCampaign: async (data: CreateCampaignRequest): Promise<CampaignDetailResponse> => {
        const response: AxiosResponse<CampaignDetailResponse> = await httpClient.post(API_ROUTES.campaigns.createCampaign, data);
        return response.data;
    },
    updateStatus: async (id: string, data: UpdateCampaignStatusRequest): Promise<CampaignResponse> => {
        const response: AxiosResponse<CampaignResponse> = await httpClient.patch(API_ROUTES.campaigns.updateCampaignStatus(id), data);
        return response.data;
    },
};