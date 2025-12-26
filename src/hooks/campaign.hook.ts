import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import {
  CampaignResource,
  CreateCampaignRequest,
  UpdateCampaignRequest,
  CampaignResponse,
  CampaignDetailResponse,
  CreateCampaignResponse,
  UpdateCampaignResponse,
  DeleteCampaignResponse  
} from "@/types/campaign.type";
import { campaignService } from "@/services/campaign.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCampaigns = (params: {
  // status: string;
  q: string;
  // page: number;
  // pageSize: number;
  // searchText: string;
}) => {
  return useQuery({
    queryKey: ["campaigns", params],
    queryFn: () => campaignService.getCampaigns(params),
  });
};

export const useCampaignById = (id: string) => {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: () => campaignService.getCampaignById(id),
  });
}

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["createCampaign"],
    mutationFn: (data: CreateCampaignRequest) =>
      campaignService.createCampaign(data),
    onSuccess: (res: CreateCampaignResponse) => {
      toast.success("Tạo chiến dịch thành công");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      navigate({ to: `/admin/campaigns/${res.id}` });
    },
    onError: () => {
      toast.error("Tạo chiến dịch thất bại");
    },
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<UpdateCampaignResponse, Error, { id: string; data: UpdateCampaignRequest }>({
    mutationKey: ["updateCampaign"],
    mutationFn: async ({ id, data }) =>
      campaignService.updateCampaign(id, data),
    onSuccess: (res: UpdateCampaignResponse) => {
      toast.success("Cập nhật chiến dịch thành công");
      queryClient.invalidateQueries({ queryKey: ["campaign", res.id] });
      navigate({ to: `/admin/campaigns/${res.id}` });
    },
    onError: () => {
      toast.error("Cập nhật chiến dịch thất bại");
    }
  });
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["deleteCampaign"],
    mutationFn: (id: string) => campaignService.deleteCampaign(id),
    onSuccess: (res: DeleteCampaignResponse) => {
      toast.success(res.note);
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      navigate({ to: `/admin/campaigns` });
    },
    onError: () => {
      toast.error("Xóa chiến dịch thất bại");
    }
  });
};