import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { AssignRoleRequest, AssignRoleResponse, CreateUserRequest, UserResponse } from "@/types/user.type";
import { toast } from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";


export const useUsers = (params: {
  page?: number;
  pageSize?: number;
  q?: string;
}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
  });
}

export const useUserById = (id?: string) => {
  return useQuery({
    queryKey: ["user", id],
    enabled: !!id,
    queryFn: () => userService.getUserById(id as string),
  });
}
export function useUserMe(token?: string) {
  const tokenToUse = token ?? localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["me"],
    queryFn: userService.getUserMe,
    enabled: !!tokenToUse,
    staleTime: 1000 * 60 * 10, // 10 phút
    retry: false,
  });
}
export const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (p: { id: string; data: CreateUserRequest }) =>
      userService.updateUser(p.id, p.data),
    onSuccess: (res: UserResponse) => {
      toast.success(res.message || "Cập nhật người dùng thành công");
      // Update cached `users` queries so the list reflects the updated user
      // immediately when navigating back.
      queryClient.setQueriesData({ queryKey: ["users"] }, (old: any) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: old.data.map((u: any) => (u.id === res.id ? { ...u, id: res.id, email: res.email, status: res.status, profile: res.profile } : u)),
        };
      });
      navigate({ to: "/admin/users" });

    },
    onError: () => {
      toast.error("Cập nhật người dùng thất bại");
    }
  });
}
export const useCreateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: (data: CreateUserRequest) => userService.createUser(data),
    onSuccess: (res: UserResponse) => {
      toast.success("Tạo người dùng thành công");
      queryClient.setQueriesData({ queryKey: ["users"] }, (old: any) => {
        if (!old) return old;
        const created = { id: res.id, email: res.email, status: res.status, profile: res.profile };
        const prevTotal = typeof old.total === "number" ? old.total : 0;
        return {
          ...old,
          data: [created, ...(old.data || [])],
          total: prevTotal + 1,
        };
      });
      navigate({ to: "/admin/users" });
    },
    onError: () => {
      toast.error("Tạo người dùng thất bại");
    }
  });
};

export const useAssignRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["assignRole"],
    mutationFn: (p: { userId: string; data: AssignRoleRequest }) =>
      userService.assignRole(p.userId, p.data),
    onSuccess: (res: AssignRoleResponse) => {
      toast.success(res.message || "Gán vai trò thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Gán vai trò thất bại");
    }
  });
};


