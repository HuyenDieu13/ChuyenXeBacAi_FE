import { Gender } from "@/types/volunteer-application.type";

export type UserStatus = "ACTIVE" | "INACTIVE";

export interface CreateUserRequest {
  fullName: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: Gender;
  address?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface UserResource {
  id: string;
  fullName: string;
  email: string;
  status: UserStatus;
}

export interface AssignRoleRequest {
  roleCode: "VOLUNTEER" | string;
}
