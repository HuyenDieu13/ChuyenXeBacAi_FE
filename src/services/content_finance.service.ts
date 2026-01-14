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
    CreateDonationResponse,
    DashboardAnomaliesRespose,
    FundChartsResponse,
    FundStatsResponse,
    ContentLatestResponse,
    ContentByIdResponse
} from "@/types/content_finance.type";
import { get } from "http";

export const contentFinanceService = {
    getContentByCampaignId: async (campaignId: string): Promise<ContentByCampaignIdResponse> => {
        const response: AxiosResponse<ContentByCampaignIdResponse> = await httpClient.get(API_ROUTES.content.getContentByCampaignId(campaignId));
        return response.data;
    },
    createContent: async (data: CreateContentRequest): Promise<CreateContentResponse> => {
        const response: AxiosResponse<CreateContentResponse> = await httpClient.post(API_ROUTES.content.createContent, data);
        return response.data;
    },
    subscribe: async (data: SubcribeRequest): Promise<SubcribeResponse> => {
        const response: AxiosResponse<SubcribeResponse> = await httpClient.post(API_ROUTES.content.subscribeContent, data);
        return response.data;
    },
    // createDonation: async (id: string, data: CreateDonationRequest): Promise<CreateDonationResponse> => {
    //     const response: AxiosResponse<CreateDonationResponse> = await httpClient.post(API_ROUTES.finance.createDonation(id), data);
    //     return response.data;
    // }
    getDashboardAnomalies: async (): Promise<DashboardAnomaliesRespose[]> => {
        const response: AxiosResponse<DashboardAnomaliesRespose[]> = await httpClient.get(API_ROUTES.finance.getDashboardAnomalies);
        return response.data;
    },
    getFundCharts: async (campaignId: string, year: number): Promise<FundChartsResponse> => {
        const response: AxiosResponse<FundChartsResponse> = await httpClient.get(API_ROUTES.finance.fundChart + `?campaignId=${campaignId}&year=${year}`);
        return response.data;
    },
    getFundStats: async (campaignId: string): Promise<FundStatsResponse> => {
        const response: AxiosResponse<FundStatsResponse> = await httpClient.get(API_ROUTES.finance.fundStats + `?campaignId=${campaignId}`);
        return response.data;
    },
    getContentLatest: async (params: { page: number, pageSize: number }): Promise<ContentLatestResponse> => {
        const response: AxiosResponse<ContentLatestResponse> = await httpClient.get(API_ROUTES.content.getContentLatest(params));
        return response.data;
    },
    getContentById: async (id: string): Promise<ContentByIdResponse> => {
        const response: AxiosResponse<ContentByIdResponse> = await httpClient.get(API_ROUTES.content.getContentById(id));
        return response.data;
    }
};