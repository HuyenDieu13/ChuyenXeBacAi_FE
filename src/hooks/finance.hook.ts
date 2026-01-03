// src/hooks/media.hooks.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { financeService} from "@/services/finance.service";
import { FinanceByCampaignIdResponse } from "@/types/content_finance";

export const useGetFinanceByCampaignId = (campaignId?: string) => {
    return useQuery<FinanceByCampaignIdResponse | null>({
        queryKey: ["finance-by-campaign", campaignId],
        enabled: !!campaignId,
        queryFn: () => financeService.getFinanceByCampaignId(campaignId as string),
    });

};

