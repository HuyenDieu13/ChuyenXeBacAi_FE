import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
    SessionResponse, 
    CreateRegistrationRequest,
    CreateRegistrationResponse,
    ReviewRegistrationRequest,
    ReviewRegistrationResponse,
    CreateSessionRequest,
    CreateSessionResponse 
} from "@/types/session.type";


export const sessionService = {
    getSessionsByCampaignId: async (campaignId: string): Promise<SessionResponse> => {
        const response: AxiosResponse<SessionResponse> = await httpClient.get(API_ROUTES.sessions.getSessionsByCampaignId(campaignId));
        return response.data;
    },
    createSession: async (data: CreateSessionRequest): Promise<CreateSessionResponse> => {
        const response: AxiosResponse<CreateSessionResponse> = await httpClient.post(API_ROUTES.sessions.createSession, data);
        return response.data;
    },
    createRegistration: async (data: CreateRegistrationRequest): Promise<CreateRegistrationResponse> => {
        const response: AxiosResponse<CreateRegistrationResponse> = await httpClient.post(API_ROUTES.sessions.registerForSession, data);
        return response.data;
    },
    reviewRegistration: async (id: string, data: ReviewRegistrationRequest): Promise<ReviewRegistrationResponse> => {
        const response: AxiosResponse<ReviewRegistrationResponse> = await httpClient.post(API_ROUTES.sessions.reviewRegistration(id), data);
        return response.data;
    }
};