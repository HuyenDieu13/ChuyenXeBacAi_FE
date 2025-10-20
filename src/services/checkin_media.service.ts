import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
    CreateCheckinRequest, 
    CreateCheckinResponse,
    CreateMediaRequest, 
    CreateMediaResponse, 
    CheckinsResponse, 
    MediasResponse 
} from "@/types/checkins_media.type";

export const checkinMediaService = {
    createCheckin: async (data: CreateCheckinRequest): Promise<CreateCheckinResponse> => {
        const response: AxiosResponse<CreateCheckinResponse> = await httpClient.post(API_ROUTES.checkin.createCheckIn, data);    
        return response.data;
    },
    createMedia: async (data: CreateMediaRequest): Promise<CreateMediaResponse> => {
        const response: AxiosResponse<CreateMediaResponse> = await httpClient.post(API_ROUTES.media.createMedia, data);    
        return response.data;
    },
};