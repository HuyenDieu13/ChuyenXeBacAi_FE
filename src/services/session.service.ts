import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";

import {
  SessionResource,
  SessionListResponse,
  CreateSessionRequest,
  CreateSessionResponse,
  UpdateSessionRequest,
  UpdateSessionResponse,
  CreateRegistrationRequest,
  CreateRegistrationResponse,
  ReviewRegistrationRequest,
  ReviewRegistrationResponse,
  SessionRosterResponse,
} from "@/types/session.type";

export const sessionService = {
  /* ======================================================
   * SESSION LIST
   * GET /api/Sessions/by-campaign/{campaignId}
   * ====================================================== */
  getSessionsByCampaignId: async (
    campaignId: string
  ): Promise<SessionListResponse> => {
    const res: AxiosResponse<SessionListResponse> =
      await httpClient.get(
        API_ROUTES.sessions.getSessionsByCampaignId(campaignId)
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

  /* ======================================================
   * DELETE SESSION
   * DELETE /api/Sessions/{id}
   * ====================================================== */
  deleteSession: async (id: string): Promise<void> => {
    await httpClient.delete(
      API_ROUTES.sessions.deleteSession(id)
    );
  },

  /* ======================================================
   * REGISTRATION
   * ====================================================== */
  createRegistration: async (
    data: CreateRegistrationRequest
  ): Promise<CreateRegistrationResponse> => {
    const res: AxiosResponse<CreateRegistrationResponse> =
      await httpClient.post(
        API_ROUTES.sessions.registerForSession,
        data
      );
    return res.data;
  },

  reviewRegistration: async (
    id: string,
    data: ReviewRegistrationRequest
  ): Promise<ReviewRegistrationResponse> => {
    const res: AxiosResponse<ReviewRegistrationResponse> =
      await httpClient.post(
        API_ROUTES.sessions.reviewRegistration(id),
        data
      );
    return res.data;
  },

  /* ======================================================
   * ROSTER – APPROVED ONLY
   * GET /api/Sessions/{sessionId}/roster
   * ====================================================== */
  getApprovedRoster: async (
    sessionId: string,
    params?: {
      page?: number;
      pageSize?: number;
      q?: string;
    }
  ): Promise<SessionRosterResponse> => {
    const res: AxiosResponse<SessionRosterResponse> =
      await httpClient.get(
        API_ROUTES.sessions.getSessionRoster(sessionId),
        { params }
      );
    return res.data;
  },
};
