import { DataResponse } from "./base_response.type";

/* =========================
 * ENUM
 * ========================= */
import { VolunteerRegistrationStatus } from "@/enum/status.enum";

/* =========================
 * USER INFO
 * ========================= */
export interface VolunteerUserResource {
  id: string;
  email?: string;
  fullName?: string;
}

/* =========================
 * REGISTRATION RESOURCE
 * ========================= */
export interface VolunteerRegistrationResource {
  session: any;
  id: string;

  campaign_id?: string;
  session_id?: string;

  status?: VolunteerRegistrationStatus;

  applyReason?: string;

  applied_at?: string;
  reviewed_at?: string;

  user?: VolunteerUserResource;
}
export interface CreateVolunteerRegistrationRequest {
  userId: string;
  campaignId: string;
  sessionId: string;
  applyReason: string;
}

export interface CreateVolunteerRegistrationResponse {
  id: string;
  message: string;
}

export interface VolunteerRegistrationReviewRequest {
  status: VolunteerRegistrationStatus;
  rejectReason?: string;
}
export interface VolunteerRegistrationReviewResponse {
  message: string;
  status: VolunteerRegistrationStatus;
}
