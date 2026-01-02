import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";

import {
  SessionListResponse,
  SessionDetailResponse,
  CreateSessionRequest,
  CreateSessionResponse,
  UpdateSessionRequest,
  UpdateSessionResponse,
  CreateSectionQRRequest,
  CreateSectionQRResponse,

} from "@/types/session.type";
import { get } from "http";

export const sessionService = {
  /* ======================================================
   * SESSION LIST
   * GET /api/Sessions/by-campaign/{campaignId}
   * API trả về: SessionApiResource[]
   * ====================================================== */
  getSessionsByCampaignId: async (
    campaignId: string
  ): Promise<SessionListResponse> => {
    const res: AxiosResponse<SessionListResponse> =
      await httpClient.get(
        API_ROUTES.sessions.getSessionsByCampaignId(campaignId)
      );

    return res.data
  },
  getSessionById: async (
    id: string
  ): Promise<SessionDetailResponse> => {
    const res: AxiosResponse<SessionDetailResponse> =
      await httpClient.get(
        API_ROUTES.sessions.getSessionById(id)
      );
    return res.data;
  },

  /* ======================================================
   * CREATE SESSION
   * POST /api/Sessions
   * ====================================================== */
  createSession: async (
    data: CreateSessionRequest
  ): Promise<CreateSessionResponse> => {
    const res: AxiosResponse<CreateSessionResponse> =
      await httpClient.post(
        API_ROUTES.sessions.createSession,
        data
      );

    return res.data;
  },

  /* ======================================================
   * UPDATE SESSION
   * PUT /api/Sessions/{id}
   * ====================================================== */
  updateSession: async (
    id: string,
    data: UpdateSessionRequest
  ): Promise<UpdateSessionResponse> => {
    const res: AxiosResponse<UpdateSessionResponse> =
      await httpClient.put(
        API_ROUTES.sessions.updateSession(id),
        data
      );

    return res.data;
  },

  updateStatusSession: async (  
    id: string,
    data: { status: string }
  ): Promise<UpdateSessionResponse> => {
    const res: AxiosResponse<UpdateSessionResponse> =
      await httpClient.patch(
        API_ROUTES.sessions.updateStatusSession(id),
        data
      );
    return res.data;
  },
  getOrCodeSession: async (  
    id: string,
  ): Promise<CreateSectionQRResponse> => {
    const res: AxiosResponse<CreateSectionQRResponse> =
      await httpClient.get(
        API_ROUTES.sessions.getOrCodeSession(id),
      );
    return res.data;
  },
};
