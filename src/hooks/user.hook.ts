import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { AssignRoleRequest, CreateUserRequest } from "@/types/user.type";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: CreateUserRequest) => userService.create(data),
  });
};

export const useAssignRole = () => {
  return useMutation({
    mutationFn: (p: { userId: string; data: AssignRoleRequest }) =>
      userService.assignRole(p.userId, p.data),
  });
};
