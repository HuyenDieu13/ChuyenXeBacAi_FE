import { DataResponse } from "./base_response.type";
import { SessionStatus, SessionShift } from "@/enum/status.enum";

/* ======================================================
 * API RESOURCE (THEO SWAGGER)
 * ====================================================== */

/* ======================================================
 * UI RESOURCE (DÙNG TRONG FE)
 * ====================================================== */
export interface SessionResource {
  id: string;
  campaignId?: string;

  title?: string;
  description?: string;

  session_date?: string;

  place_name?: string;

  lat?: number;
  lng?: number;

  quota?: number;
  approved_volunteers?: number;

  status?: SessionStatus;
  geo_radius_m?: number;
}

/* ======================================================
 * CREATE / UPDATE SESSION
 * ====================================================== */

export interface CreateSessionRequest {
  campaignId?: string;
  title?: string;
  sessionDate?: string;
  quota?: number;
  status?: SessionStatus;
  placeName?: string;
  lat?: number;
  lng?: number;
  geoRadiusM?: number;
}

export interface UpdateSessionRequest extends CreateSessionRequest {
  status?: SessionStatus;
}
export interface UpdateStatusSessionResquest {
  status: SessionStatus;
}



/* ======================================================
 * RESPONSES
 * ====================================================== */

export type SessionListResponse = SessionResource[];
export type SessionDetailResponse = SessionResource;  

export type  CreateSessionResponse = {
  id: string;
  title?: string;
}
export type  UpdateSessionResponse = {
  id: string;
  message?: string;
}
