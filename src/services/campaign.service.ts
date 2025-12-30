import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";
import { 
  CampaignResponse, 
  CampaignDetailResponse,
  CreateCampaignRequest, 
  UpdateCampaignRequest,
  CreateCampaignResponse,
  UpdateCampaignResponse,
  DeleteCampaignResponse
} from "@/types/campaign.type";

export const campaignService = {
  /* ================= GET LIST ================= */
  getCampaigns: async (
    params: { q?: string }
  ): Promise<CampaignResponse> => {
    const response: AxiosResponse<CampaignResponse> =
      await httpClient.get(
        API_ROUTES.campaigns.getCampaigns(params)
      );
    return response.data;
  },

  /* ================= GET DETAIL ================= */
  getCampaignById: async (
    id: string
  ): Promise<CampaignDetailResponse> => {
    const response: AxiosResponse<CampaignDetailResponse> =
      await httpClient.get(
        API_ROUTES.campaigns.getCampaignById(id)
      );
    return response.data;
  },

  /* ================= CREATE ================= */
  createCampaign: async (
    data: CreateCampaignRequest
  ): Promise<CreateCampaignResponse> => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description ?? "");
    formData.append("location", data.location ?? "");
    formData.append("goalAmount", String(data.goalAmount));
    formData.append("startDate", data.startDate ?? "");
    formData.append("endDate", data.endDate ?? "");
    formData.append("coverUrl", data.coverUrl ?? "");
    formData.append("status", String(data.status));


    const response: AxiosResponse<CreateCampaignResponse> =
      await httpClient.post(
        API_ROUTES.campaigns.createCampaign,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    return response.data;
  },

  /* ================= UPDATE ================= */
  updateCampaign: async (
    id: string,
    data: UpdateCampaignRequest
  ): Promise<UpdateCampaignResponse> => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description ?? "");
    formData.append("location", data.location ?? "");
    formData.append("goalAmount", String(data.goalAmount));
    formData.append("startDate", data.startDate ?? "");
    formData.append("endDate", data.endDate ?? "");
    formData.append("coverUrl", data.coverUrl ?? "");
    formData.append("status", String(data.status));


    const response: AxiosResponse<UpdateCampaignResponse> =
      await httpClient.put(
        API_ROUTES.campaigns.updateCampaign(id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    return response.data;
  },

  /* ================= DELETE ================= */
  deleteCampaign: async (
    id: string
  ): Promise<DeleteCampaignResponse> => {
    const response: AxiosResponse<DeleteCampaignResponse> =
      await httpClient.delete(
        API_ROUTES.campaigns.deleteCampaign(id)
      );
    return response.data;
  },
};
