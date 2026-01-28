import { API_ROUTES } from "@/config/ApiConfig";
import httpClient from "@/config/AxiosConfig";
import { AxiosResponse } from "axios";

import { LogRecentActivityResponse } from "@/types/log.type";

export const logService = {
    getRecentActivity: async (limit?: number): Promise<LogRecentActivityResponse> => {
        const response: AxiosResponse<LogRecentActivityResponse> = await httpClient.get(
            API_ROUTES.logs.getRecentActivity({ limit })
        );
        return response.data;
    },
};