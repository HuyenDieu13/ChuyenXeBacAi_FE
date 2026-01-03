import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
    ContentByCampaignIdResponse,
    CreateContentRequest,
    CreateContentResponse,
    SubcribeRequest,
    SubcribeResponse,
    CreateDonationRequest,
    CreateDonationResponse
 } from "@/types/content_finance";

export const contentFinanceService = {
    getContentByCampaignId: async (campaignId: string): Promise<ContentByCampaignIdResponse> => {
        const response: AxiosResponse<ContentByCampaignIdResponse> = await httpClient.get(API_ROUTES.content.getContentByCampaignId(campaignId));
        return response.data;
    },
    createContent: async (data: CreateContentRequest): Promise<CreateContentResponse> => {
        const response: AxiosResponse<CreateContentResponse> = await httpClient.post(API_ROUTES.content.createContent, data);
        return response.data;
    },
    // subcribe: async (data: SubcribeRequest): Promise<SubcribeResponse> => {
    //     const response: AxiosResponse<SubcribeResponse> = await httpClient.post(API_ROUTES.content.subscribeContent, data);
    //     return response.data;
    // },
    // createDonation: async (id: string, data: CreateDonationRequest): Promise<CreateDonationResponse> => {
    //     const response: AxiosResponse<CreateDonationResponse> = await httpClient.post(API_ROUTES.finance.createDonation(id), data);
    //     return response.data;
    // }
};