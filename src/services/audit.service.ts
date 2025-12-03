import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";

export const auditService = {
    getAudits: async (params: { entityType: string; entityId: string; }): Promise<any> => {
        const response: AxiosResponse<any> = await httpClient.get(API_ROUTES.audit.getAudits(params));
        return response.data;
    }
};