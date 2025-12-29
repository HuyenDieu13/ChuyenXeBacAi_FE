import { RegistrationStatus } from "@/enum/status.enum";

export type Gender = "MALE" | "FEMALE";

export interface VolunteerApplicationResource {
  id: string;
  userId?: string;
  email?: string;
  full_name?: string;
  phone?: string;
  age?: number;
  gender?: Gender;
  address?: string;
  skills?: string;
  availability?: string;
  apply_reason?: string;
  status: RegistrationStatus;
  created_at?: string;
  reviewed_at?: string | null;
  reject_reason?: string | null;
  hasAccount?: boolean;
}

export interface CreateVolunteerApplicationRequest {
  email: string;
  fullName: string;
  phone?: string;
  age?: number;
  gender: Gender;
  address?: string;
  skills?: string;
  availability?: string;
  applyReason?: string;
}

/** ✅ SỬA Ở ĐÂY */
export interface ReviewVolunteerApplicationRequest {
  status: RegistrationStatus;
  rejectReason?: string; // camelCase đúng với BE
}

export interface PagedVolunteerApplicationsResponse {
  total: number;
  data: VolunteerApplicationResource[];
}

export interface ReviewVolunteerApplicationResponse {
  id: string;
  status: RegistrationStatus;
  message: string;
}
