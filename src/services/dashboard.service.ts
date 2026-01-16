import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";

import {
    StatsResponse,
    FinancialPerformanceResponse,
    CashflowTrendResponse,
    VolunteerFunnelResponse,
    ApplicationStatusTrendResponse,
    DemographicsResponse,
    CampaignAlertResponse
} from "@/types/dashboard.type";

export const dashboardService = {
    getStats: async (): Promise<StatsResponse> => {
        const response: AxiosResponse<StatsResponse> = await httpClient.get(API_ROUTES.dashboard.getStats);
        return response.data;
    },  
    getFinancialPerformance: async (start: number, end: number): Promise<FinancialPerformanceResponse> => {
        const response: AxiosResponse<FinancialPerformanceResponse> = await httpClient.get(API_ROUTES.dashboard.getFinancialPerformance(start, end));
        return response.data;
    },
    getCashFlowTrend: async (range: string): Promise<CashflowTrendResponse> => {
        const response: AxiosResponse<CashflowTrendResponse> = await httpClient.get(API_ROUTES.dashboard.getCashFlowTrend(range));
        return response.data;
    },
    getVolunteerFunnel: async (start: number, end: number): Promise<VolunteerFunnelResponse> => {
        const response: AxiosResponse<VolunteerFunnelResponse> = await httpClient.get(API_ROUTES.dashboard.getVolunteerFunnel(start, end));
        return response.data;
    },
    getApplicationStatusTrend: async (range: string): Promise<ApplicationStatusTrendResponse> => {
        const response: AxiosResponse<ApplicationStatusTrendResponse> = await httpClient.get(API_ROUTES.dashboard.getApplicationStatusTrend(range));
        return response.data;
    },
    getDemographics: async (): Promise<DemographicsResponse> => {
        const response: AxiosResponse<DemographicsResponse> = await httpClient.get(API_ROUTES.dashboard.getDemographics);
        return response.data;
    },
    getCampaignAlert: async (): Promise<CampaignAlertResponse> => {
        const response: AxiosResponse<CampaignAlertResponse> = await httpClient.get(API_ROUTES.dashboard.getCampaignAlert);
        return response.data;
    },
};  