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
  const { mutateAsync: assignRole } = useAssignRole();

  return useMutation<
    ReviewVolunteerApplicationResponse & {
      full_name: string;
      email: string;
      phone?: string;
      age?: number;
      gender?: any;
      address?: string;
    },
    any,
    { id: string; data: ReviewVolunteerApplicationRequest }
  >({
    mutationFn: ({ id, data }) =>
      volunteerApplicationService.review(id, data),

    onSuccess: async (res, variables) => {
      const { data } = variables;

      if (data.status === RegistrationStatus.APPROVED) {
        // 1️⃣ Tạo user
        const createdUser = await createUser({
          fullName: res.full_name,
          email: res.email,
          phone: res.phone,
          age: res.age,
          gender: res.gender,
          address: res.address,
        });

        // 2️⃣ Gán role VOLUNTEER
        await assignRole({
          userId: createdUser.id,
          data: {
            roleCode: "VOLUNTEER",
          },
        });
      }

      toast.success(res.message || "Duyệt đơn thành công");
      qc.invalidateQueries({ queryKey: ["volunteer-applications"] });
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
        "Duyệt đơn thất bại"
      );
    },
  });
};
