import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

import { volunteerApplicationService } from "@/services/volunteer-application.service";
import { RegistrationStatus, VolunteerRegistrationStatus } from "@/enum/status.enum";
import {
  CreateVolunteerApplicationRequest,
  ReviewVolunteerApplicationRequest,
  ReviewVolunteerApplicationResponse,
  VolunteerApplicationResource,
  VolunteerApplicationDetailResponse,
  CreateVolunteerApplicationResponse
  
} from "@/types/volunteer-application.type";
import { 
  CreateVolunteerRegistrationRequest, CreateVolunteerRegistrationResponse ,
    VolunteerRegistrationReviewRequest, VolunteerRegistrationReviewResponse,
    CheckStatusRegistrationResponse, DetailRegistrationResponse
} from "@/types/volunteer-registration.type";
import { useAssignRole, useCreateUser } from "./user.hook";
import { getVolunteerRegistrationsByCampaign, volunteerRegistrationService } from "@/services/volunteer-registration.service";
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

export const useVolunteerApplicationById = (id?: string) => {
  return useQuery<VolunteerApplicationDetailResponse>({
    queryKey: ["volunteer-application", id],
    queryFn: () =>
      volunteerApplicationService.getVolunteerApplicationById(id as string),
    enabled: !!id,
  });
}
/* CREATE */
export const useCreateVolunteerApplication = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateVolunteerApplicationResponse, Error, CreateVolunteerApplicationRequest>({
    mutationFn: (data: CreateVolunteerApplicationRequest) =>
      volunteerApplicationService.createVolunteerApplication(data),

    onSuccess: (res: CreateVolunteerApplicationResponse) => {
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
        //TẠO USER
        const user = await createUser({
          fullName: volunteer.full_name || "",
          email: volunteer.email,
          phone: volunteer.phone,
          age: volunteer.age,
          gender: volunteer.gender,
          address: volunteer.address,
        });

        // GÁN ROLE
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
export function useApplyVolunteerRegistration() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVolunteerRegistrationRequest) =>
      volunteerRegistrationService.applyRegistration(data),

    onSuccess: (res: CreateVolunteerRegistrationResponse) => {
      toast.success(res?.message || "Đăng ký thành công");
      qc.invalidateQueries({ queryKey: ["volunteer-registrations"] });
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Đăng ký thất bại"
      );
    },
  });
}

export const useVolunteerRegistrations = (params: {
  campaignId?: string;
}) => {
  return useQuery({
    queryKey: ["volunteer-registrations", params],
    queryFn: () =>
      volunteerRegistrationService.getVolunteerRegistrations({
        page: 1,
        pageSize: 100,
        campaignId: params.campaignId,
      }),
    enabled: !!params.campaignId,
  });
};

// export const useReviewVolunteerRegistration = (campaignId?: string) => {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: {
//       id: string;
//       status: VolunteerRegistrationStatus;
//       rejectReason?: string;
//     }) =>
//       volunteerRegistrationService.reviewRegistration(payload.id, {
//         status: payload.status,
//         rejectReason: payload.rejectReason,
//       }),

//     onSuccess: () => {
//       qc.invalidateQueries({
//         queryKey: ["volunteer-registrations", { campaignId }],
//       });
//     },
//   });
// };

/* ======================================================
 * ADMIN – LIST REGISTRATIONS BY CAMPAIGN
 * ====================================================== */
export const useAdminVolunteerRegistrationsByCampaign = (
  campaignId?: string
) => {
  return useQuery({
    queryKey: ["admin-volunteer-registrations", campaignId],
    queryFn: () =>
      getVolunteerRegistrationsByCampaign({
        campaignId: campaignId!,
      }),
    enabled: !!campaignId,
  });
};

/* ======================================================
 * ADMIN – REVIEW REGISTRATION
 * ====================================================== */
export const useAdminReviewVolunteerRegistration = (
  campaignId?: string
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: string;
      status: VolunteerRegistrationStatus;
      rejectReason?: string;
    }) =>
      volunteerRegistrationService.reviewRegistration(payload.id, {
        status: payload.status,
        rejectReason: payload.rejectReason,
      }),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-volunteer-registrations", campaignId],
      });
    },
  });
};
/* ======================================================
 * REVIEW REGISTRATION
 * ====================================================== */
export const useReviewVolunteerRegistration = () => {
  const qc = useQueryClient();
  return useMutation<
    VolunteerRegistrationReviewResponse,
    any,
    {
      id: string;
      data: VolunteerRegistrationReviewRequest; 
    }
  >({
    mutationFn: ({ id, data }) =>
      volunteerRegistrationService.reviewRegistration(id, data),
    onSuccess: (res, variables) => {
      const { id, data } = variables;

      // 1️⃣ Update UI ngay (optimistic)  
      qc.setQueryData(["volunteer-registrations"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((v: any) =>
            v.id === id ? { ...v, status: data.status } : v
          ),
        };
      });
      toast.success(res.message);
    },

    onError: () => { 
      toast.error("Duyệt đăng ký thất bại");
    },
  });
}

export const useCheckStatusVolunteerRegistration = (params: { sessionId: string; userId: string }) => {
  return useQuery<CheckStatusRegistrationResponse>({
    queryKey: ["check-status-volunteer-registration", params],
    queryFn: () =>
      volunteerRegistrationService.checkStatus(params),
    enabled: !!params.sessionId && !!params.userId,
  });
}

export const useDetailVolunteerRegistration = (params: { sessionId: string; userId: string }) => {
  return useQuery<DetailRegistrationResponse>({
    queryKey: ["detail-volunteer-registration", params],
    queryFn: () =>
      volunteerRegistrationService.getDetailRegistration(params),
    enabled: !!params.sessionId && !!params.userId,
  });
}