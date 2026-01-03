import httpClient from "@/config/AxiosConfig";
import { FinanceResource } from "@/types/content_finance";
import { API_ROUTES } from "@/config/ApiConfig"
import { AxiosResponse } from "axios";
export const financeService = {
    getFinanceByCampaignId: async (campaignId: string): Promise<FinanceResource> => {
        const response: AxiosResponse<FinanceResource> = await httpClient.get(API_ROUTES.finance.getFinanceByCampaignId(campaignId));
        return response.data;
    },
};
