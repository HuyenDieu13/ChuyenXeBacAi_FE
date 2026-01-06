import httpClient from "@/config/AxiosConfig";
import {
  CreateVolunteerApplicationRequest,
  ReviewVolunteerApplicationRequest,
  PagedVolunteerApplicationsResponse,
  VolunteerApplicationDetailResponse,
  CreateVolunteerApplicationResponse


} from "@/types/volunteer-application.type";
import { API_ROUTES } from "@/config/ApiConfig";
import { RegistrationStatus } from "@/enum/status.enum";

export const volunteerApplicationService = {
  // GET list
  getVolunterApplications: async (params: {
    page?: number;
    pageSize?: number;
    status?: string;
    q?: string;
  }): Promise<PagedVolunteerApplicationsResponse> => {
    const res = await httpClient.get(
      API_ROUTES.volunteerApplications.getVolunteers(params)
    );
    return res.data;
  },
  getVolunteerApplicationById: async (id: string): Promise<VolunteerApplicationDetailResponse> => {
    const res = await httpClient.get(API_ROUTES.volunteerApplications.getVolunteerById(id));
    return res.data;
  },
  // CREATE
  createVolunteerApplication: async (
    data: CreateVolunteerApplicationRequest
  ): Promise<CreateVolunteerApplicationResponse> => {
    const res = await httpClient.post(
      API_ROUTES.volunteerApplications.createVolunteer,
      data
    );
    return res.data;
  },

  review: async (
    id: string,
    data: ReviewVolunteerApplicationRequest
  ) => {
    const payload =
      data.status === RegistrationStatus.REJECTED
        ? data
        : { status: data.status };

    const res = await httpClient.post(
      `/volunteers/applications/${id}/review`,
      payload
    );

    return res.data;
  },

};
