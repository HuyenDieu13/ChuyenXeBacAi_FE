import httpClient from "@/config/AxiosConfig";
import {
  AssignRoleRequest,
  CreateUserRequest,
} from "@/types/user.type";

export const userService = {
  create: async (data: CreateUserRequest) => {
    const res = await httpClient.post("/api/Users", data);
    return res.data;
  },

  assignRole: async (userId: string, data: AssignRoleRequest) => {
    const res = await httpClient.post(`/api/Users/${userId}/roles`, data);
    return res.data;
  },

  // tạo user từ đơn TNV
  createFromVolunteerApplication: async (applicationId: string) => {
    const res = await httpClient.post(
      `/api/users/from-volunteer/${applicationId}`
    );
    return res.data;
  },
  resetPassword: async (userId: string) => {
  const res = await httpClient.post(
    `/api/Auth/${userId}/reset-password`
  );
  return res.data;
  },
};

