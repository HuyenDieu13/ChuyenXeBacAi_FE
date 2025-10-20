import {create} from 'zustand';
import { CampaignResource } from '@/types/campaign.type';
interface CampaignState {
    campaigns: CampaignResource[]; 
    setCampaigns: (campaigns: CampaignResource[]) => void;
    addCampaign: (campaign: CampaignResource) => void;
    updateCampaign: (updatedCampaign: CampaignResource) => void;
    clearCampaigns: () => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
    campaigns: [],
    setCampaigns: (campaigns) => set({ campaigns }),
    addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
    updateCampaign: (updatedCampaign) => set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
            campaign.id === updatedCampaign.id ? updatedCampaign : campaign
        ),
    })),
    clearCampaigns: () => set({ campaigns: [] }),
}));
