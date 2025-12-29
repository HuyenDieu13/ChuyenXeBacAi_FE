import { Gender } from "@/enum/gender";
import { UserStatus } from "@/enum/status.enum";
export interface UserProfile {
  full_name?: string;
  phone?: string;
  age?: number;
  gender?: Gender;
  address?: string;
  avatar_url?: string;
}
export interface RoleUserResource {
  id: string;
  code?: string;
  name?: string;
  grantedAt?: string;
}
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
  email?: string;
  status?: UserStatus;
  profile?: UserProfile;
}
export interface UpdateUserRequest extends CreateUserRequest { }

export interface UserResponse extends UserResource {
  message: string;
}
export interface AssignRoleRequest {
  roleCode: "VOLUNTEER" | string;
  grantedBy?: string;
  note?: string;
  grantedAt?: string;
}

export interface UserListResponse {
  total: number;
  data: UserResource[];
}

export interface UserDetailResponse{ 
  id: string;
  email: string;
  status: UserStatus;
  profile: UserProfile;
  roles: RoleUserResource[];
}

export interface AssignRoleResponse {
  message: string;
}