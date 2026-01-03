import React, { useState } from "react";
import { Eye, CheckCircle2, Clock, XCircle, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "@tanstack/react-router";
import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";
import TableComponent, { Column } from "@/components/TableAdminComponent";

import { useCampaigns } from "@/hooks/campaign.hook";
import { useSessionsByCampaign } from "@/hooks/session.hook";
import { useApplyVolunteerRegistration } from "@/hooks/volunteer-application.hook";

import { CampaignResource } from "@/types/campaign.type";
import { SessionResource } from "@/types/session.type";
import {
  CampaignStatus,
  CAMPAIGN_STATUS_LABEL,
  SessionStatus,
} from "@/enum/status.enum";
import { useAuth } from "@/contexts/AuthProvider";
/* ================= CONST ================= */

const CheckinPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId, role, isLoading: authLoading } = useAuth();

  /* ================= API ================= */
  const canViewCampaigns = !authLoading && !!userId && role === "VOLUNTEER";

  const { data: campaigns = [], isLoading: loadingCampaigns } = useCampaigns(
    { q: "" },
    {
      enabled: canViewCampaigns,
      queryKey: [],
    }
  );

  const [selectedCampaign, setSelectedCampaign] = useState<CampaignResource>();

  const { data: sessions = [], isLoading: loadingSessions } =
    useSessionsByCampaign(selectedCampaign?.id || "");

  const applyMutation = useApplyVolunteerRegistration();

  /* ================= STATE ================= */
  const [qrSession, setQrSession] = useState<SessionResource | null>(null);
  const [registerSession, setRegisterSession] =
    useState<SessionResource | null>(null);
  const [applyReason, setApplyReason] = useState("");

  /** mock FE: session đã đăng ký */
  const [registeredSessionIds, setRegisteredSessionIds] = useState<string[]>(
    []
  );
  // table state
  const needLogin = !authLoading && !userId;

  const tableState = (() => {
    if (authLoading) {
      return {
        loading: true,
        data: [],
        noDataText: "Đang tải thông tin người dùng...",
      };
    }

    if (!userId) {
      return {
        loading: false,
        data: [],
        noDataText: "Bạn cần đăng nhập để xem danh sách chiến dịch",
      };
    }

    if (role !== "VOLUNTEER") {
      return {
        loading: false,
        data: [],
        noDataText: "Chỉ tình nguyện viên mới có thể check-in",
      };
    }

    return {
      loading: loadingCampaigns,
      data: campaigns ?? [],
      noDataText: "Chưa có chiến dịch nào.",
    };
  })();

  /* ================= STATUS BADGE ================= */
  const getStatusBadge = (status: CampaignStatus) => {
    const label = CAMPAIGN_STATUS_LABEL[status];

    switch (status) {
      case CampaignStatus.ONGOING:
        return (
          <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs">
            <CheckCircle2 size={14} /> {label}
          </span>
        );
      case CampaignStatus.PLANNING:
        return (
          <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-xs">
            <Clock size={14} /> {label}
          </span>
        );
      case CampaignStatus.CANCELLED:
        return (
          <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-3 py-1 rounded-full text-xs">
            <XCircle size={14} /> {label}
          </span>
        );
      default:
        return (
          <span className="inline-flex bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs">
            {label}
          </span>
        );
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const campaignColumns: Column<CampaignResource>[] = [
    {
      key: "index",
      title: "#",
      align: "center",
      render: (_, i) => i + 1,
    },
    {
      key: "title",
      title: "Chiến dịch",
      render: (c) => (
        <div className="flex flex-col">
          <span className="font-semibold text-[#355C7D] text-sm">
            {c.title}
          </span>
          <span className="text-xs text-gray-500">
            {c.location || "Chưa cập nhật địa điểm"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (c) => getStatusBadge(c.status || CampaignStatus.PLANNING),
    },
    {
      key: "actions",
      title: "Chi tiết",
      align: "center",
      render: (c) => (
        <button
          onClick={() => setSelectedCampaign(c)}
          className="text-[#355C7D] hover:underline text-sm flex items-center gap-1"
        >
          <Eye size={16} /> Chọn
        </button>
      ),
    },
  ];

  const sessionColumns: Column<SessionResource>[] = [
    {
      key: "index",
      title: "#",
      align: "center",
      render: (_, i) => i + 1,
    },
    {
      key: "title",
      title: "Buổi hoạt động",
      render: (s) => (
        <span className="font-medium text-[#355C7D]">{s.title}</span>
      ),
    },
    {
      key: "session_date",
      title: "Ngày",
      render: (s) =>
        s.session_date
          ? new Date(s.session_date).toLocaleDateString("vi-VN")
          : "--",
    },
    {
      key: "place_name",
      title: "Địa điểm",
      render: (s) => s.place_name || "--",
    },
    {
      key: "quota",
      title: "TNV",
      align: "center",
      render: (s) => `${s.approved_volunteers ?? 0} / ${s.quota ?? 0}`,
    },
    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (s) =>
        s.status === SessionStatus.ONGOING ? (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            Đang diễn ra
          </span>
        ) : (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            Không khả dụng
          </span>
        ),
    },
    {
      key: "checkin",
      title: "Check-in",
      align: "center",
      render: (s) => {
        const registered = registeredSessionIds.includes(s.id);
        const canCheckin = s.status === SessionStatus.ONGOING;

        if (!registered) {
          return (
            <button
              onClick={() => setRegisterSession(s)}
              className="px-4 py-1 text-sm rounded-full bg-green-600 text-white"
            >
              Đăng ký buổi
            </button>
          );
        }

        return (
          <button
            disabled={!canCheckin}
            onClick={() => setQrSession(s)}
            className="px-4 py-1 text-sm rounded-full bg-[#355C7D] text-white disabled:opacity-40"
          >
            Quét QR
          </button>
        );
      },
    },
  ];

  /* ================= RENDER ================= */
  return (
    <div className="w-full flex flex-col items-center bg-[#F9FAFB]">
      <BannerCustomComponent
        title="Điểm danh hoạt động"
        content="Quét mã QR tại địa điểm để xác nhận có mặt."
      />

      <div className="max-w-7xl px-4 py-6 w-full space-y-6">
        <BreadcrumbRibbon label="Điểm danh hoạt động" />

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {selectedCampaign && (
            <button
              onClick={() => {
                setSelectedCampaign(undefined);
                setQrSession(null);
              }}
              className="text-sm text-[#355C7D] hover:underline mb-3"
            >
              ← Quay lại danh sách chiến dịch
            </button>
          )}

          <TableComponent
            columns={campaignColumns}
            data={tableState.data}
            loading={tableState.loading}
            noDataText={tableState.noDataText}
          />
          {needLogin && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate({ to: "/login" })}
                className="px-6 py-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-500 transition"
              >
                Đăng nhập ngay
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= QR MODAL ================= */}
      {qrSession && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[360px] relative">
            <button
              onClick={() => setQrSession(null)}
              className="absolute top-3 right-3"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-center mb-2">QR Check-in</h3>

            <p className="text-center text-sm text-gray-500 mb-4">
              {qrSession.title}
            </p>

            <div className="flex justify-center">
              <QRCodeCanvas
                value={JSON.stringify({
                  userId: userId || "",
                  sessionId: qrSession.id,
                  campaignId: selectedCampaign?.id,
                  type: "CHECKIN",
                })}
                size={220}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= REGISTER MODAL ================= */}
      {registerSession && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] relative">
            <button
              onClick={() => {
                setRegisterSession(null);
                setApplyReason("");
              }}
              className="absolute top-3 right-3"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold mb-4 text-[#355C7D]">
              Đăng ký buổi tình nguyện
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Buổi hoạt động
                </label>
                <input
                  disabled
                  value={registerSession.title}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Lý do đăng ký *
                </label>
                <textarea
                  rows={3}
                  value={applyReason}
                  onChange={(e) => setApplyReason(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setRegisterSession(null)}
                className="px-4 py-2 border rounded-full"
              >
                Hủy
              </button>

              <button
                disabled={applyMutation.isPending}
                onClick={() => {
                  if (!applyReason) {
                    alert("Vui lòng nhập lý do đăng ký");
                    return;
                  }

                  applyMutation.mutate(
                    {
                      /* ✅ ĐÚNG BACKEND */
                      userId: userId || "",
                      campaignId: selectedCampaign?.id || "",
                      sessionId: registerSession.id,
                      applyReason: applyReason,
                    },
                    {
                      onSuccess: () => {
                        alert("Đăng ký thành công");

                        setRegisteredSessionIds((prev) => [
                          ...prev,
                          registerSession.id,
                        ]);

                        setRegisterSession(null);
                        setApplyReason("");
                      },
                      onError: (err: any) => {
                        alert(
                          err?.response?.data?.message || "Đăng ký thất bại"
                        );
                      },
                    }
                  );
                }}
                className="px-5 py-2 bg-[#355C7D] text-white rounded-full disabled:opacity-50"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckinPage;
