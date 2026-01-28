
import { API_ROUTES } from "@/config/ApiConfig";
import { AxiosResponse } from "axios";
import httpClient from "@/config/AxiosConfig";
import {
  AssignRoleRequest,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserResponse,
  AssignRoleResponse,
  UserDetailResponse,
  ToggleStatusResponse
} from "@/types/user.type";

export const userService = {
  getUsers: async (params: {
    page?: number;
    pageSize?: number;
    q?: string;
  }) => {
    const res: AxiosResponse<UserListResponse> = await httpClient.get(API_ROUTES.users.getUsers(params));
    return res.data;
  },

  getUserById: async (id: string) => {
    const res: AxiosResponse<UserDetailResponse> = await httpClient.get(API_ROUTES.users.getUserById(id));
    return res.data;
  },
  getUserMe: async () => {
    const res: AxiosResponse<UserDetailResponse> = await httpClient.get(API_ROUTES.auth.getMe);
    return res.data;
  },
  createUser: async (data: CreateUserRequest) => {
    const res: AxiosResponse<UserResponse> = await httpClient.post(API_ROUTES.users.createUser, data);
    return res.data;
  },

  assignRole: async (userId: string, data: AssignRoleRequest) => {
    const res: AxiosResponse<AssignRoleResponse> = await httpClient.post(API_ROUTES.users.assignRole(userId), data);
    return res.data;
  },

  updateUser: async (id: string, data: UpdateUserRequest) => {
    const res: AxiosResponse<UserResponse> = await httpClient.put(API_ROUTES.users.updateUser(id), data);
    return res.data;
  },

  toggleStatus: async (id: string) => {
    const res: AxiosResponse<ToggleStatusResponse> = await httpClient.patch(API_ROUTES.users.toggleStatus(id));
    return res.data;
  }
};

