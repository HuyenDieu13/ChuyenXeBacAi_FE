import httpClient from "@/config/AxiosConfig";
import { FinanceByCampaignIdResponse } from "@/types/content_finance";
import { API_ROUTES } from "@/config/ApiConfig"
import { AxiosResponse } from "axios";
import { get } from "http";
// finance.service.ts
export const financeService = {
    getFinanceByCampaignId: async (campaignId: string): Promise<FinanceByCampaignIdResponse | null> => {
        try {
            const response: AxiosResponse<FinanceByCampaignIdResponse> = await httpClient.get(
                API_ROUTES.finance.getFinanceByCampaignId(campaignId)
            );
            return response.data;
        } catch (error) {
            // Handle error (e.g., log it)
            console.error("Error fetching finance by campaign ID:", error);
            return null;
        }
    },
}   
;


