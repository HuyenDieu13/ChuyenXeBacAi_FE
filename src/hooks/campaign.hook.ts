import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import {
  CampaignResource,
  CreateCampaignRequest,
  UpdateCampaignRequest,
  CampaignResponse,
  CampaignDetailResponse,
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

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["createCampaign"],
    mutationFn: (data: CreateCampaignRequest) =>
      campaignService.createCampaign(data),
    onSuccess: (res: CampaignDetailResponse) => {
      toast.success("Tạo chiến dịch thành công");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      navigate({ to: `/admin/campaigns/${res.id}` });
    },
    onError: () => {
      toast.error("Tạo chiến dịch thất bại");
    },
  });
};


