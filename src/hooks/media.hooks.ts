// src/hooks/media.hooks.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { mediaService,} from "@/services/media.service";
import { UploadMultipleMediaResponse } from "@/types/media.type";

export const useUploadMultipleMedia = (
  campaignId?: string,
  uploaderId?: string
) => {
  return useMutation<UploadMultipleMediaResponse, Error, File[]>({
    mutationKey: ["upload-multiple-media", campaignId, uploaderId],
    mutationFn: async (files) => {
      if (!campaignId) throw new Error("campaignId is required");
      if (!uploaderId) throw new Error("uploaderId is required");
      return mediaService.uploadMultipleMedia(campaignId, uploaderId, files);
    },
  });
};
export const useGetMediaByCampaignId = (campaignId?: string) => {
  return useQuery({
    queryKey: ["media-by-campaign", campaignId],
    enabled: !!campaignId,
    queryFn: () => mediaService.getMediaByCampaignId(campaignId as string),
  });
};