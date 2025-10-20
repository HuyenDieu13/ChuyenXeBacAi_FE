import create from 'domain'
import { get } from 'http';
const baseURL = import.meta.env.VITE_API_BASE_URL;
const buildQuery = (endpoint: string, params: Record<string, any>) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.append(key, String(value));
        }
    });

    return `${baseURL}${endpoint}?${query.toString()}`;
};
export const API_ROUTES = {
    auth:{
        login: `${baseURL}/auth/login`,
        register: `${baseURL}/auth/register`,
        refreshToken: `${baseURL}/auth/refresh-token`,
    },
    campaigns: {
        getCampaigns: (params: { 
            pageIndex?: number; 
            pageSize?: number; 
            searchText?: string 
        }) =>
            buildQuery('/campaigns', params),
        getCampaignById: (id: string) => `${baseURL}/campaigns/${id}`,
        createCampaign: `${baseURL}/campaigns`,
        updateCampaignStatus: (id: string) => `${baseURL}/campaigns/${id}`,
        deleteCampaign: (id: string) => `${baseURL}/campaigns/${id}`,
    },
    sessions: {
        getSessionsByCampaignId: (campaignId: string) => `${baseURL}/sessions/by-campaign/${campaignId}`,
        createSession: `${baseURL}/sessions`,
        registerForSession: `${baseURL}/sessions/registrations`,
        reviewRegistration: (id: string) => `${baseURL}/sessions/registrations/${id}/review`,
    },
    checkin: {
        createCheckIn: `${baseURL}/checkins`,
    },
    media: {
        createMedia: `${baseURL}/media`,
    },
    content:{
        getContentByCampaignId: (campaignId: string) => `${baseURL}/content/posts/by-campaign/${campaignId}`,
        createContent: `${baseURL}/content/posts`,
        subscribeContent: `${baseURL}/content/subscribe`,
    },
    finance:{
        createDonation: (campaignId: string) => `${baseURL}/finance/donations/${campaignId}`,
    }

    
};