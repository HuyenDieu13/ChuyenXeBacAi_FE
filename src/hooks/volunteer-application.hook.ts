import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

import { volunteerApplicationService } from "@/services/volunteer-application.service";
import { RegistrationStatus } from "@/enum/status.enum";
import {
  CreateVolunteerApplicationRequest,
  ReviewVolunteerApplicationRequest,
  ReviewVolunteerApplicationResponse,
} from "@/types/volunteer-application.type";
import { UserDetailResponse } from "@/types/user.type";
import { useAssignRole, useCreateUser } from "./user.hook";
/* LIST */
export const useVolunteerApplications = (params: {
  status?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["volunteer-applications", params],
    queryFn: () =>
      volunteerApplicationService.getVolunterApplications(params),
  });
};

/* CREATE */
export const useCreateVolunteerApplication = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateVolunteerApplicationRequest) =>
      volunteerApplicationService.createVolunteerApplication(data),

    onSuccess: (res: any) => {
      toast.success(res?.message || "Nộp đơn thành công");
      qc.invalidateQueries({ queryKey: ["volunteer-applications"] });
      navigate({ to: "/home" });
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Nộp đơn thất bại"
      );
    },
  });
};

export const useReviewVolunteerApplication = () => {
  const qc = useQueryClient();
  const { mutateAsync: createUser } = useCreateUser();

  return useMutation<
    ReviewVolunteerApplicationResponse,
    any,
    { id: string; data: ReviewVolunteerApplicationRequest }
  >({
    mutationFn: ({ id, data }) =>
      volunteerApplicationService.review(id, data),

    onSuccess: async (res, variables) => {
      const { id, data } = variables;

      if (data.status !== RegistrationStatus.APPROVED) {
        toast.success(res.message || "Cập nhật trạng thái thành công");
        qc.invalidateQueries({ queryKey: ["volunteer-applications"] });
        return;
      }

      // 🔥 LẤY VOLUNTEER TỪ CACHE ĐÚNG CÁCH
      const queries = qc.getQueriesData({
        queryKey: ["volunteer-applications"],
      });

      const volunteer = queries
        .flatMap(([, q]: any) => q?.data || [])
        .find((v: any) => v.id === id);

      if (!volunteer) {
        toast.error("Không tìm thấy dữ liệu tình nguyện viên");
        return;
      }

      // ✅ TẠO USER (BE TỰ GÁN ROLE VOLUNTEER)
      await createUser({
        fullName: volunteer.full_name,
        email: volunteer.email,
        phone: volunteer.phone,
        age: volunteer.age,
        gender: volunteer.gender,
        address: volunteer.address,
        avatarUrl: volunteer.avatar_url,
        bio: volunteer.applyReason,
      });

      toast.success("Duyệt đơn & tạo tài khoản thành công");
      qc.invalidateQueries({ queryKey: ["volunteer-applications"] });
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Duyệt đơn thất bại"
      );
    },
  });
};

