import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

import { volunteerApplicationService } from "@/services/volunteer-application.service";
import { userService } from "@/services/user.service";
import { RegistrationStatus } from "@/enum/status.enum";
import {
  CreateVolunteerApplicationRequest,
  ReviewVolunteerApplicationRequest,
  ReviewVolunteerApplicationResponse,
} from "@/types/volunteer-application.type";

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

/* REVIEW */
export const useReviewVolunteerApplication = () => {
  const qc = useQueryClient();

  return useMutation<
    ReviewVolunteerApplicationResponse,
    any,
    { id: string; data: ReviewVolunteerApplicationRequest }
  >({
    mutationFn: ({ id, data }) =>
      volunteerApplicationService.review(id, data),

    onSuccess: async (res, { id, data }) => {
      // APPROVED → tạo user
      if (data.status === RegistrationStatus.APPROVED) {
        try {
          await userService.createFromVolunteerApplication(id);
        } catch (err: any) {
          toast.error(
            err?.response?.data?.message ||
              "Tạo tài khoản thất bại"
          );
          return;
        }
      }

      toast.success(res.message);
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
