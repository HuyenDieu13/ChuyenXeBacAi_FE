import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
    CampaignResponse, 
    CampaignDetailResponse,
    CreateCampaignRequest, 
    UpdateCampaignRequest,
    CreateCampaignResponse,
    UpdateCampaignResponse,
    DeleteCampaignResponse
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
    createCampaign: async (data: CreateCampaignRequest): Promise<CreateCampaignResponse> => {
        const response: AxiosResponse<CreateCampaignResponse> = await httpClient.post(API_ROUTES.campaigns.createCampaign, data);
        return response.data;
    },
    updateCampaign: async (id: string, data: UpdateCampaignRequest): Promise<UpdateCampaignResponse> => {
        const response: AxiosResponse<UpdateCampaignResponse> = await httpClient.patch(API_ROUTES.campaigns.updateCampaign(id), data);
        return response.data;
    },
    deleteCampaign: async (id: string): Promise<DeleteCampaignResponse> => {
        const response: AxiosResponse<DeleteCampaignResponse> = await httpClient.delete(API_ROUTES.campaigns.deleteCampaign(id));
        return response.data;
    }
};