import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

import { volunteerApplicationService } from "@/services/volunteer-application.service";
import { RegistrationStatus } from "@/enum/status.enum";
import {
  CreateVolunteerApplicationRequest,
  ReviewVolunteerApplicationRequest,
  ReviewVolunteerApplicationResponse,
  VolunteerApplicationResource,
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
  const { mutateAsync: assignRole } = useAssignRole(); // 👈 thêm hook này

  return useMutation<
    ReviewVolunteerApplicationResponse,
    any,
    {
      id: string;
      data: ReviewVolunteerApplicationRequest;
      volunteer?: VolunteerApplicationResource;
    }
  >({
    mutationFn: ({ id, data }) =>
      volunteerApplicationService.review(id, data),

    onSuccess: async (res, variables) => {
      const { data, volunteer } = variables;

      // 1️⃣ Update UI ngay (optimistic)
      qc.setQueryData(["volunteer-applications"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((v: any) =>
            v.id === res.id ? { ...v, status: res.status } : v
          ),
        };
      });

      if (data.status !== RegistrationStatus.APPROVED) {
        toast.success(res.message);
        return;
      }

      if (!volunteer) {
        toast.error("Thiếu dữ liệu tạo tài khoản");
        return;
      }

      try {
        // 2️⃣ TẠO USER
        const user = await createUser({
          fullName: volunteer.full_name || "",
          email: volunteer.email,
          phone: volunteer.phone,
          age: volunteer.age,
          gender: volunteer.gender,
          address: volunteer.address,
        });

        // 3️⃣ GÁN ROLE
        await assignRole({
          userId: user.id, // 👈 QUAN TRỌNG
          data: {
            roleCode: "VOLUNTEER",
            note: "Auto assign after approve volunteer application",
          },
        });

        toast.success("Duyệt đơn, tạo tài khoản & gán quyền thành công");
      } catch (e: any) {
        toast.error(
          e?.response?.data?.message ||
            "Tạo user hoặc gán role thất bại"
        );
      }
    },

    onError: () => {
      toast.error("Duyệt đơn thất bại");
    },
  });
};
