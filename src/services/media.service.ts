// src/services/media.service.ts
import httpClient from "@/config/AxiosConfig";
import { MediaAssetResource, UploadMultipleMediaResponse } from "@/types/media.type";
import { API_ROUTES } from "@/config/ApiConfig";

const uploadMultipleMedia = async (
  campaignId: string,
  uploaderId: string,
  files: File[]
): Promise<UploadMultipleMediaResponse> => {
  if (!campaignId) throw new Error("Missing campaignId");
  if (!uploaderId) throw new Error("Missing uploaderId");

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await httpClient.post<UploadMultipleMediaResponse>(
    API_ROUTES.media.uploadMultipleMedia,
    formData,
    {
      params: {
        campaignId,
        uploaderId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
export const mediaService = {
  uploadMultipleMedia,
  getMediaByCampaignId: async (
    campaignId: string
  ): Promise<MediaAssetResource[]> => {
    const response = await httpClient.get<MediaAssetResource[]>(
        API_ROUTES.media.getMediaByCampaignId(campaignId)
    );      
    return response.data;
    },  
};
