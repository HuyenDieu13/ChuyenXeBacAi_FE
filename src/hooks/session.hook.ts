import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  CreateSessionRequest,
  UpdateSessionRequest,
  UpdateStatusSessionResquest,
  SessionListResponse,
  CreateSessionResponse,
  UpdateSessionResponse,
  SessionDetailResponse,  
} from "@/types/session.type";

import { sessionService } from "@/services/session.service";


/* ======================================================
 * LIST BY CAMPAIGN
 * ====================================================== */
export const useSessionsByCampaign = (campaignId: string) => {
  return useQuery<SessionListResponse>({
    queryKey: ["sessions", campaignId],
    enabled: !!campaignId,
    queryFn: () =>
      sessionService.getSessionsByCampaignId(campaignId),
  });
};

/* ======================================================
 * DETAIL BY ID
 * ⚠️ QUAN TRỌNG:
 * - KHÔNG map ở đây
 * - Trả đúng kiểu API (SessionDetailResponse)
 * ====================================================== */
export const useSessionById = (id?: string) => {
  return useQuery<SessionDetailResponse>({
    queryKey: ["session", id],
    enabled: !!id,
    queryFn: () =>
      sessionService.getSessionById(id as string),
  });
};

/* ======================================================
 * CREATE
 * ====================================================== */
export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    CreateSessionResponse,
    Error,
    CreateSessionRequest
  >({
    mutationKey: ["createSession"],
    mutationFn: (data) =>
      sessionService.createSession(data),

    onSuccess: (_, variables) => {
      toast.success("Tạo buổi hoạt động thành công");

      queryClient.invalidateQueries({
        queryKey: ["sessions", variables.campaignId],
      });

      navigate({
        to: `/admin/campaigns/${variables.campaignId}/sessions`,
      });
    },

    onError: () => {
      toast.error("Tạo buổi hoạt động thất bại");
    },
  });
};

/* ======================================================
 * UPDATE
 * ====================================================== */
export const useUpdateSession = (campaignId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    UpdateSessionResponse,
    Error,
    { id: string; data: UpdateSessionRequest }
  >({
    mutationKey: ["updateSession"],
    mutationFn: ({ id, data }) =>
      sessionService.updateSession(id, data),

    onSuccess: () => {
      toast.success("Cập nhật buổi hoạt động thành công");

      queryClient.invalidateQueries({
        queryKey: ["sessions", campaignId],
      });

      navigate({
        to: `/admin/campaigns/${campaignId}/sessions`,
      });
    },

    onError: () => {
      toast.error("Cập nhật buổi hoạt động thất bại");
    },
  });
};

/* ======================================================
 * UPDATE STATUS
 * ====================================================== */
export const useUpdateStatusSession = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateSessionResponse,
    Error,
    UpdateStatusSessionResquest
  >({
    mutationKey: ["updateStatusSession", id],
    mutationFn: (data) =>
      sessionService.updateStatusSession(id, data),

    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },

    onError: () => {
      toast.error("Cập nhật trạng thái thất bại");
    },
  });
};

/* ======================================================
 * QR CODE
 * ====================================================== */

export const useGetSessionQRImage = (sessionId: string) => {
  return useQuery({
    queryKey: ["session-qr-image", sessionId],
    queryFn: () => sessionService.getOrCodeSession(sessionId),
    enabled: !!sessionId,
    staleTime: Infinity, // QR không thay đổi thường xuyên
  });
};