import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  CreateCampaignRequest,
  UpdateCampaignRequest,
  CampaignResponse,
  CampaignDetailResponse,
  CreateCampaignResponse,
  UpdateCampaignResponse,
  DeleteCampaignResponse,
  CampaignOngoingResponse
} from "@/types/campaign.type";

import { campaignService } from "@/services/campaign.service";

/* =========================
   GET LIST
========================= */
export const useCampaigns = (
  params: { q: string },
  options?: UseQueryOptions<CampaignResponse>
) => {
  return useQuery<CampaignResponse>({
    queryKey: ["campaigns", params],
    queryFn: () => campaignService.getCampaigns(params),
    ...options,
  });
};

/* =========================
   GET DETAIL
========================= */
export const useCampaignById = (id?: string) => {
  return useQuery<CampaignDetailResponse>({
    queryKey: ["campaign", id],
    enabled: !!id,
    queryFn: () => campaignService.getCampaignById(id as string),
  });
};

/* =========================
   CREATE
========================= */
export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateCampaignResponse, Error, CreateCampaignRequest>({
    mutationKey: ["createCampaign"],
    mutationFn: (data) => campaignService.createCampaign(data),
    onSuccess: () => {
      toast.success("Tạo chiến dịch thành công");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      navigate({ to: "/admin/campaigns" });
    },
    onError: () => {
      toast.error("Tạo chiến dịch thất bại");
    },
  });
};

/* =========================
   UPDATE
========================= */
export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    UpdateCampaignResponse,
    Error,
    { id: string; data: UpdateCampaignRequest }
  >({
    mutationKey: ["updateCampaign"],
    mutationFn: ({ id, data }) =>
      campaignService.updateCampaign(id, data),
    onSuccess: (res) => {
      toast.success("Cập nhật chiến dịch thành công");
      queryClient.invalidateQueries({ queryKey: ["campaign", res.id] });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      navigate({ to: "/admin/campaigns" });
    },
    onError: () => {
      toast.error("Cập nhật chiến dịch thất bại");
    },
  });
};

/* =========================
   DELETE
========================= */
export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<DeleteCampaignResponse, Error, string>({
    mutationKey: ["deleteCampaign"],
    mutationFn: (id) => campaignService.deleteCampaign(id),
    onSuccess: (res) => {
      toast.success(res.note ?? "Xóa thành công");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      navigate({ to: "/admin/campaigns" });
    },
    onError: () => {
      toast.error("Xóa chiến dịch thất bại");
    },
  });
};
export const useCampaignOngoing = (
    options?: UseQueryOptions<CampaignOngoingResponse[]>
) => {
  return useQuery<CampaignOngoingResponse[]>({
    queryKey: ["campaigns-ongoing",],
    queryFn: () => campaignService.getCampaignOngoing(),
    ...options,
  });
}
