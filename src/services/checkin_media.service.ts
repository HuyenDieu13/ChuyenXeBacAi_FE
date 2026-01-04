import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
    CreateCheckinRequest, 
    CheckinsResponse, 
} from "@/types/checkins_media.type";

export const checkinMediaService = {
    createCheckin: async (data: CreateCheckinRequest): Promise<string> => {
        const response: AxiosResponse<string> = await httpClient.post(API_ROUTES.checkin.createCheckIn, data);    
        return response.data;
    },
    getCheckinBySession: async (sessionId: string): Promise<CheckinsResponse> => {
        const response: AxiosResponse<CheckinsResponse> = await httpClient.get(API_ROUTES.checkin.getCheckinBySession(sessionId));    
        return response.data;
    }
};