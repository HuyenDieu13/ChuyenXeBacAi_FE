import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { AssignRoleRequest, AssignRoleResponse, CreateUserRequest, UserResponse, ToggleStatusResponse } from "@/types/user.type";
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
      // Update cached `users` queries (all variants with params)
      // so the list reflects the updated user immediately when navigating back.
      queryClient.setQueriesData({ queryKey: ["users"] }, (old: any) => {
        if (!old) return old;
        // older cache shape may be { data: [] } for paged responses
        if (old.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.map((u: any) =>
              u.id === res.id ? { ...u, id: res.id, email: res.email, status: res.status, profile: res.profile } : u
            ),
          };
        }
        // if it's the array itself
        if (Array.isArray(old)) {
          return old.map((u: any) => (u.id === res.id ? { ...u, id: res.id, email: res.email, status: res.status, profile: res.profile } : u));
        }
        return old;
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

export const useToggleStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggleStatus"],
    mutationFn: (id: string) => userService.toggleStatus(id),
    onSuccess: (res: ToggleStatusResponse) => {
      toast.success(res.message || "Thay đổi trạng thái thành công");
      // Update all cached `users` queries in-place so list reflects new status
      queryClient.setQueriesData({ queryKey: ["users"] }, (old: any) => {
        if (!old) return old;
        if (old.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.map((u: any) => (u.id === res.id ? { ...u, status: res.newStatus } : u)),
          };
        }
        if (Array.isArray(old)) {
          return old.map((u: any) => (u.id === res.id ? { ...u, status: res.newStatus } : u));
        }
        return old;
      });
      // Also update single user detail cache if present
      queryClient.setQueryData(["user", res.id], (old: any) => {
        if (!old) return old;
        return { ...old, status: res.newStatus };
      });
    },
    onError: () => {
      toast.error("Thay đổi trạng thái thất bại");
    }
  });
};