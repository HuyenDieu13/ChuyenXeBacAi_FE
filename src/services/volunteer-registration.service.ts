import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import { API_ROUTES } from "@/config/ApiConfig";

import {
  
  CreateVolunteerRegistrationRequest,
  CreateVolunteerRegistrationResponse,
  VolunteerRegistrationReviewRequest,
  VolunteerRegistrationReviewResponse,
  CheckStatusRegistrationResponse,
  DetailRegistrationResponse,
} from "@/types/volunteer-registration.type";
import { VolunteerRegistrationStatus } from "@/enum/status.enum";
import { get } from "http";

/* ======================================================
 * SERVICE
 * ====================================================== */
export const volunteerRegistrationService = {
  /* ======================================================
   * GET /api/volunteers/registrations
   * ====================================================== */
  getVolunteerRegistrations: async (params: { page?: number; pageSize?: number; campaignId?: string; sessionId?: string; status?: string; }) => {
    const res = await httpClient.get(
      API_ROUTES.volunteerRegistrations.getRegistrations(params)
    );
    return res.data;
  },

  /* ======================================================
   * POST /api/volunteers/registrations/apply
   * ====================================================== */
    applyRegistration: async (
      data: CreateVolunteerRegistrationRequest
    ): Promise<CreateVolunteerRegistrationResponse> => {
      const res = await httpClient.post(
        API_ROUTES.volunteerRegistrations.applyRegistration,
        data
      );
      return res.data;
    },

  /* ======================================================
   * PATCH /api/volunteers/registrations/{id}/review
   * ====================================================== */
  reviewRegistration: async (id: string, data: VolunteerRegistrationReviewRequest): Promise<VolunteerRegistrationReviewResponse> => {
    const res = await httpClient.post(
      API_ROUTES.volunteerRegistrations.reviewRegistration(id),
      data
    );
    return res.data;
  },

  /* ======================================================
   * DELETE /api/volunteers/registrations/{id}
   * ====================================================== */
  deleteRegistration: async (id: string) => {
    await httpClient.delete(
      API_ROUTES.volunteerRegistrations.deleteRegistration(id)
    );
  },
  checkStatus: async (params: { sessionId: string; userId: string }): Promise<CheckStatusRegistrationResponse> => {
    const res = await httpClient.get(
      API_ROUTES.volunteerRegistrations.checkStatus(params)
    );
    return res.data;
  },
  getDetailRegistration: async (params: { sessionId: string; userId: string }): Promise<DetailRegistrationResponse> => {
    const res = await httpClient.get(
      API_ROUTES.volunteerRegistrations.getDetailRegistration(params)
    );
    return res.data;
  },
};

export const getVolunteerRegistrationsByCampaign = async (params: {
  campaignId: string;
  page?: number;
  pageSize?: number;
}) => {
  return volunteerRegistrationService.getVolunteerRegistrations({
    campaignId: params.campaignId,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 100,
  });
};

/**
 * Lấy registrations theo session (nếu cần sau này)
 */
export const getVolunteerRegistrationsBySession = async (params: {
  sessionId: string;
  page?: number;
  pageSize?: number;
}) => {
  return volunteerRegistrationService.getVolunteerRegistrations({
    sessionId: params.sessionId,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 100,
  });
};