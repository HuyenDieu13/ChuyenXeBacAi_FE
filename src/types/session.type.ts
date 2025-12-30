import { DataResponse } from "./base_response.type";

/* ======================================================
 * ENUM
 * ====================================================== */
export enum SessionStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  ENDED = "ENDED",
}

/* ======================================================
 * SESSION RESOURCE (DÙNG CHO LIST + DETAIL)
 * ====================================================== */
export interface SessionResource {
  id: string;
  campaignId: string;

  title: string;

  sessionDate: string; // ISO datetime
  shift: "morning" | "afternoon" | "evening" | "custom";

  // BE: PlaceName → FE: location
  location: string;

  lat: number;
  lng: number;

  quota: number;

  /**
   * Danh sách ID TNV đã APPROVED
   * (phục vụ hiển thị x / quota)
   */
  volunteers: string[];

  status: SessionStatus;

  /**
   * % tiến độ (BE có thể tính hoặc FE tính)
   */
  progress: number;

  /* ===== OPTIONAL / UI ONLY ===== */
  description?: string;
  banner?: string;
}

/* ======================================================
 * CREATE / UPDATE SESSION
 * ====================================================== */

/**
 * POST /api/Sessions
 */
export interface CreateSessionRequest {
  CampaignId: string;
  Title: string;
  SessionDate: string;
  Shift: string;
  Quota: number;
  Status: SessionStatus;
  PlaceName: string;
  Lat: number;
  Lng: number;
  GeoRadiusM?: number;
}

/**
 * PUT /api/Sessions/{id}
 */
export interface UpdateSessionRequest {
  Title: string;
  SessionDate: string;
  Shift: string;
  Quota: number;
  Status: SessionStatus;
  PlaceName: string;
  Lat: number;
  Lng: number;
  GeoRadiusM?: number;
}

/* ======================================================
 * REGISTRATION
 * ====================================================== */

export interface CreateRegistrationRequest {
  UserId: string;
  CampaignId: string;
  SessionId: string;
}

export interface ReviewRegistrationRequest {
  Status: "APPROVED" | "REJECTED";
  RejectedReason?: string;
}

/* ======================================================
 * ROSTER (APPROVED VOLUNTEERS)
 * ====================================================== */

export interface SessionRosterItem {
  id: string;          // registrationId
  userId: string;

  fullName?: string;
  email?: string;
  phone?: string;

  role?: string;       // TEAM_LEAD, MEMBER...
  note?: string;
}

export interface SessionRosterResponse {
  items: SessionRosterItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

/* ======================================================
 * RESPONSES
 * ====================================================== */

/**
 * GET /api/Sessions/by-campaign/{campaignId}
 */
export interface SessionListResponse
  extends DataResponse<SessionResource[]> {}

/**
 * POST /api/Sessions
 */
export interface CreateSessionResponse
  extends DataResponse<SessionResource> {}

/**
 * PUT /api/Sessions/{id}
 */
export interface UpdateSessionResponse
  extends DataResponse<SessionResource> {}

/**
 * Registration responses
 */
export interface CreateRegistrationResponse
  extends DataResponse<any> {}

export interface ReviewRegistrationResponse
  extends DataResponse<any> {}
