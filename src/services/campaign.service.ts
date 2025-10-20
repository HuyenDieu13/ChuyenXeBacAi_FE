import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
    CampaignResponse, 
    CampaignPaginatedResponse, 
    CreateCampaignRequest, 
    CreateCampaignResponse,
    UpdateCampaignStatusRequest, 
} from "@/types/campaign.type";
import { get } from "http";

export const campaignService = {
    getCampaigns: async (params: { 
        pageIndex?: number; 
        pageSize?: number; 
        searchText?: string }
    ): Promise<CampaignPaginatedResponse> => {
        const response: AxiosResponse<CampaignPaginatedResponse> = await httpClient.get(API_ROUTES.campaigns.getCampaigns(params));
        return response.data;
    },
    getCampaignById: async (id: string): Promise<CampaignResponse> => {
        const response: AxiosResponse<CampaignResponse> = await httpClient.get(API_ROUTES.campaigns.getCampaignById(id));
        return response.data;
    },
    createCampaign: async (data: CreateCampaignRequest): Promise<CreateCampaignResponse> => {
        const response: AxiosResponse<CreateCampaignResponse> = await httpClient.post(API_ROUTES.campaigns.createCampaign, data);
        return response.data;
    },
    updateStatus: async (id: string, data: UpdateCampaignStatusRequest): Promise<CampaignResponse> => {
        const response: AxiosResponse<CampaignResponse> = await httpClient.patch(API_ROUTES.campaigns.updateCampaignStatus(id), data);
        return response.data;
    },
    deleteCampaign: async (id: string): Promise<void> => {
        await httpClient.delete(API_ROUTES.campaigns.deleteCampaign(id));
    }
};