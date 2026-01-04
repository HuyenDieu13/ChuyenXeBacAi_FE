import React, { useState } from "react";
import { Eye, CheckCircle2, Clock, XCircle, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "@tanstack/react-router";
import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";
import TableComponent, { Column } from "@/components/TableAdminComponent";

import { useCampaignOngoing } from "@/hooks/campaign.hook";
import { useSessionsByCampaign, useGetSessionQRImage } from "@/hooks/session.hook";
import { useApplyVolunteerRegistration, useCheckStatusVolunteerRegistration, useDetailVolunteerRegistration } from "@/hooks/volunteer-application.hook";

import { CampaignResource } from "@/types/campaign.type";
import { SessionResource } from "@/types/session.type";
import {
  CampaignStatus,
  CAMPAIGN_STATUS_LABEL,
  SessionStatus,
  SESSION_STATUS_LABEL,
  VolunteerRegistrationStatus,
  CheckinStatus,
  CHECKIN_STATUS_LABEL,
  VOLUNTEER_REGISTRATION_STATUS_LABEL,
} from "@/enum/status.enum";
import { useAuth } from "@/contexts/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CreateCheckinRequest } from "@/types/checkins_media.type";
import { useCreateCheckin } from "@/hooks/checkin.hook";
/* ================= CONST ================= */

const CheckinPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId, role, isLoading: authLoading } = useAuth();

  /* ================= API ================= */
  const canViewCampaigns = !authLoading && !!userId && role === "VOLUNTEER";
  const createCheckinMutation = useCreateCheckin();
  const { data: campaigns = [], isLoading: loadingCampaigns } = useCampaignOngoing(
    {
      enabled: canViewCampaigns,
      queryKey: [],
    }
  );
  const [userLocation, setUserLocation] = useState<{ lat?: number; lng?: number }>({});
  const [qrSessionIdForDisplay, setQrSessionIdForDisplay] = useState<string>("");
  const { data: qrImageUrl = "", isLoading: loadingQR } = useGetSessionQRImage(qrSessionIdForDisplay);

  const [selectedCampaign, setSelectedCampaign] = useState<CampaignResource>();
  const [detailSession, setDetailSession] = useState<SessionResource | null>(null);
  const detailData = useDetailVolunteerRegistration({
    sessionId: detailSession?.id || "",
    userId: userId || "",
  });
  const { data: sessions = [], isLoading: loadingSessions } =
    useSessionsByCampaign(selectedCampaign?.id || "");

  const applyMutation = useApplyVolunteerRegistration();
  const queryClient = useQueryClient();

  /* ================= STATE ================= */
  const [qrSession, setQrSession] = useState<SessionResource | null>(null);
  const [registerSession, setRegisterSession] =
    useState<SessionResource | null>(null);
  const [applyReason, setApplyReason] = useState("");


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
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success("Đã lấy vị trí");
        },
        (error) => {
          toast.error("Không lấy được vị trí: " + error.message);
        }
      );
    } else {
      toast.error("Trình duyệt không hỗ trợ geolocation");
    }
  };
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
  /* ================= SESSION STATUS BADGE ================= */
  const getSessionStatusBadge = (status: SessionStatus) => {
    const label = SESSION_STATUS_LABEL[status] || "Chưa xác định";

    switch (status) {
      case SessionStatus.ONGOING:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-green-700 bg-green-100">
            <CheckCircle2 size={14} />
            {label}
          </span>
        );

      case SessionStatus.UPCOMING:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-blue-700 bg-blue-100">
            <Clock size={14} />
            {label}
          </span>
        );

      case SessionStatus.DONE:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-gray-700 bg-gray-200">
            <CheckCircle2 size={14} />
            {label}
          </span>
        );

      case SessionStatus.PLANNING:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-purple-700 bg-purple-100">
            <Clock size={14} />
            {label}
          </span>
        );

      case SessionStatus.CANCELLED:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-red-700 bg-red-100">
            <XCircle size={14} />
            {label}
          </span>
        );

      default:
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
            {label}
          </span>
        );
    }
  };
  /* ================= VOLUNTEER REGISTRATION STATUS BADGE ================= */
  const getVolunteerStatusBadge = (status: VolunteerRegistrationStatus) => {
    const label = VOLUNTEER_REGISTRATION_STATUS_LABEL[status] || "Chưa xác định";

    switch (status) {
      case VolunteerRegistrationStatus.PENDING:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-yellow-700 bg-yellow-100">
            <Clock size={14} />
            {label}
          </span>
        );
      case VolunteerRegistrationStatus.APPROVED:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-green-700 bg-green-100">
            <CheckCircle2 size={14} />
            {label}
          </span>
        );
      case VolunteerRegistrationStatus.REJECTED:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-red-700 bg-red-100">
            <XCircle size={14} />
            {label}
          </span>
        );
      case VolunteerRegistrationStatus.NOT_REGISTERED:
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
            {label}
          </span>
        );
      default:
        return <span className="text-xs text-gray-500">{label}</span>;
    }
  };

  /* ================= CHECKIN STATUS BADGE ================= */
  const getCheckinStatusBadge = (status?: CheckinStatus) => {
    if (!status || status === null) {
      return <span className="text-xs text-gray-500">Chưa check-in</span>;
    }

    const label = CHECKIN_STATUS_LABEL[status];

    switch (status) {
      case CheckinStatus.ON_TIME:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-green-700 bg-green-100">
            <CheckCircle2 size={14} />
            {label}
          </span>
        );
      case CheckinStatus.LATE:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-orange-700 bg-orange-100">
            <Clock size={14} />
            {label}
          </span>
        );
      case CheckinStatus.INVALID:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-red-700 bg-red-100">
            <XCircle size={14} />
            {label}
          </span>
        );
      default:
        return <span className="text-xs text-gray-500">{label}</span>;
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
      render: (s) => getSessionStatusBadge(s.status || SessionStatus.Default),
    },
    {
      key: "checkin",
      title: "Check-in",
      align: "center",
      render: (s: SessionResource) => {
        const { data: detail, isLoading: checkingStatus } =
          useDetailVolunteerRegistration({
            sessionId: s.id,
            userId: userId || "",
          });

        // Đang tải trạng thái đăng ký
        if (checkingStatus) {
          return <span className="text-xs text-gray-500">Đang kiểm tra...</span>;
        }

        const status = detail?.status;
        const checkinStatus = detail?.checkInStatus;

        // Trường hợp chưa đăng ký: NOT_REGISTERED hoặc null/undefined
        const isNotRegistered = !status || status === VolunteerRegistrationStatus.NOT_REGISTERED;

        // Chỉ được quét QR khi đang APPROVED, buổi đang ONGOING, VÀ chưa check-in
        const canScanQR = status === VolunteerRegistrationStatus.APPROVED &&
          s.status === SessionStatus.ONGOING &&
          !checkinStatus;

        // Chưa đăng ký → hiển thị nút Đăng ký
        if (isNotRegistered) {
          return (
            <button
              onClick={() => setRegisterSession(s)}
              className="px-4 py-1 text-sm rounded-full bg-green-600 text-white hover:bg-green-700 transition"
            >
              Đăng ký buổi
            </button>
          );
        }

        // Đã đăng ký (bất kỳ status nào trừ NOT_REGISTERED) → hiển thị nút Quét QR
        return (
          <button
            disabled={!canScanQR}
            onClick={() => {
              setQrSession(s);
              setQrSessionIdForDisplay(s.id);
            }}
            className="px-4 py-1 text-sm rounded-full bg-[#355C7D] text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {checkinStatus ? "Đã check-in" : "Quét QR"}
          </button>
        );
      },
    },
    {
      key: "detail",
      title: "Chi tiết đăng ký",
      align: "center",
      render: (s: SessionResource) => {
        const { data: detail, isLoading } = useDetailVolunteerRegistration({
          sessionId: s.id,
          userId: userId || "",
        });

        // Nếu chưa đăng ký → không hiện nút
        if (!detail || detail.status === VolunteerRegistrationStatus.NOT_REGISTERED) {
          return <span className="text-xs text-gray-400">—</span>;
        }

        return (
          <button
            onClick={() => setDetailSession(s)}
            disabled={isLoading}
            className="text-[#355C7D] hover:underline text-sm flex items-center gap-1 mx-auto"
          >
            <Eye size={16} />
            Xem
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
          {selectedCampaign ? (
            <>
              <button
                onClick={() => {
                  setSelectedCampaign(undefined);
                  setQrSession(null);
                  setRegisterSession(null);
                  setApplyReason("");
                }}
                className="text-sm text-[#355C7D] hover:underline mb-4"
              >
                ← Quay lại danh sách chiến dịch
              </button>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Chiến dịch</p>
                  <p className="font-semibold text-[#355C7D]">{selectedCampaign.title}</p>
                </div>
                {getStatusBadge(selectedCampaign.status || CampaignStatus.PLANNING)}
              </div>

              <TableComponent
                columns={sessionColumns}
                data={sessions ?? []}
                loading={loadingSessions}
                noDataText="Chiến dịch chưa có buổi hoạt động."
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* ================= QR MODAL ================= */}
      {/* ================= QR MODAL (khi bấm Quét QR từ bảng) ================= */}
      {qrSession && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[360px] relative">
            <button
              onClick={() => {
                setQrSession(null);
                setQrSessionIdForDisplay("");
                setUserLocation({});
              }}
              className="absolute top-3 right-3"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-center mb-2">QR Check-in</h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              {qrSession.title}
            </p>

            <div className="flex justify-center">
              {loadingQR ? (
                <p>Đang tải QR...</p>
              ) : qrImageUrl ? (
                <img src={qrImageUrl} alt="QR Check-in" className="w-64 h-64" />
              ) : (
                // Fallback về client-side nếu backend lỗi
                <QRCodeCanvas
                  value={JSON.stringify({
                    userId: userId || "",
                    sessionId: qrSession.id,
                    campaignId: selectedCampaign?.id,
                    type: "CHECKIN",
                  })}
                  size={220}
                />
              )}
            </div>
            <div className="text-center mb-4">
              <button
                onClick={getLocation}
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                Lấy vị trí hiện tại của tôi
              </button>

              {userLocation.lat && (
                <p className="text-xs text-green-600 mt-2">
                  Đã lấy vị trí: {userLocation.lat.toFixed(6)}, {userLocation.lng?.toFixed(6)}
                </p>
              )}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  if (!userId) {
                    toast.error("Không tìm thấy userId");
                    return;
                  }

                  const checkinData: CreateCheckinRequest = {
                    userId: userId,
                    sessionId: qrSession.id,
                    // Giả lập vị trí (có thể thay đổi tùy ý)
                    lat: userLocation.lat ?? 10.7769,
                    lng: userLocation.lng ?? 106.7009,
                  };

                  createCheckinMutation.mutate(checkinData, {
                    onSuccess: () => {
                      // Đóng modal sau khi check-in thành công
                      setQrSession(null);
                      setQrSessionIdForDisplay("");
                      setUserLocation({});
                      // Refresh lại danh sách để cập nhật trạng thái
                      queryClient.invalidateQueries({
                        queryKey: ["detail-volunteer-registration"],
                      });
                    },
                  });
                }}
                disabled={!userId}
                className="px-6 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600"
              >
                Giả lập check-in (vị trí: {userLocation.lat?.toFixed(4) ?? "chưa lấy"}, {userLocation.lng?.toFixed(4) ?? "chưa lấy"})
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              Quét mã này tại địa điểm để điểm danh
            </p>
          </div>
        </div>
      )
      }
      {/* ================= REGISTER MODAL ================= */}
      {
        registerSession && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[420px] relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setRegisterSession(null);
                  setApplyReason("");
                  setQrSessionIdForDisplay("");
                }}
                className="absolute top-3 right-3"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-bold mb-4 text-[#355C7D]">
                Đăng ký buổi tình nguyện
              </h3>

              {/* Phần form đăng ký */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Buổi hoạt động</label>
                  <input disabled value={registerSession.title} className="w-full px-3 py-2 border rounded-lg bg-gray-100" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Lý do đăng ký *</label>
                  <textarea
                    rows={3}
                    value={applyReason}
                    onChange={(e) => setApplyReason(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setRegisterSession(null);
                    setApplyReason("");
                    setQrSessionIdForDisplay("");
                  }}
                  className="px-4 py-2 border rounded-full"
                >
                  Hủy
                </button>

                <button
                  disabled={applyMutation.isPending || !applyReason.trim()}
                  onClick={() => {
                    applyMutation.mutate(
                      {
                        userId: userId || "",
                        campaignId: selectedCampaign?.id || "",
                        sessionId: registerSession.id,
                        applyReason: applyReason.trim(),
                      },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["check-status-volunteer-registration"],
                          });
                          setQrSessionIdForDisplay(registerSession.id);
                          setApplyReason(""); // giữ modal mở để xem QR
                        },

                      }
                    );
                  }}
                  className="px-5 py-2 bg-[#355C7D] text-white rounded-full disabled:opacity-50"
                >
                  {applyMutation.isPending ? "Đang xử lý..." : "Đăng ký"}
                </button>
              </div>

              {/* ===== HIỂN THỊ QR SAU KHI THÀNH CÔNG ===== */}
              {qrSessionIdForDisplay === registerSession.id && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-center font-semibold text-[#355C7D] mb-4">
                    Đăng ký thành công! Đây là mã QR check-in của bạn:
                  </h4>

                  <div className="flex justify-center mb-4">
                    {loadingQR ? (
                      <p className="text-gray-500">Đang tải mã QR...</p>
                    ) : qrImageUrl ? (
                      <img
                        src={qrImageUrl}
                        alt="QR Check-in"
                        className="w-64 h-64 rounded-lg shadow-md"
                      />
                    ) : (
                      <p className="text-red-500">Không tải được QR</p>
                    )}
                  </div>

                  <p className="text-center text-sm text-gray-600 mb-6">
                    Quét mã này để điểm danh khi đến buổi hoạt động.
                  </p>
                </div>
              )}

            </div>
          </div>
        )
      }
      {/* ================= DETAIL MODAL ================= */}
      {detailSession && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[500px] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setDetailSession(null)}
              className="absolute top-3 right-3"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-center mb-6 text-[#355C7D]">
              Chi tiết đăng ký buổi: {detailSession.title}
            </h3>

            {/* DỮ LIỆU ĐÃ ĐƯỢC LẤY BÊN TRÊN */}
            {detailData ? (
              detailData.isLoading ? (
                <p className="text-center text-gray-500 py-8">Đang tải thông tin...</p>
              ) : !detailData.data || detailData.data.status === VolunteerRegistrationStatus.NOT_REGISTERED ? (
                <p className="text-center text-gray-500 py-8">Không có thông tin đăng ký</p>
              ) : (
                <div className="space-y-5">
                  {(() => {
                    const detail = detailData.data!;

                    return (
                      <>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Trạng thái đơn đăng ký</p>
                          <div>{getVolunteerStatusBadge(detail.status)}</div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Lý do đăng ký</p>
                          <p className="text-sm bg-gray-50 p-3 rounded-lg">{detail.applyReason || "—"}</p>
                        </div>

                        {detail.rejectReason && (
                          <div>
                            <p className="text-sm font-medium text-red-600 mb-1">Lý do từ chối</p>
                            <p className="text-sm bg-red-50 p-3 rounded-lg text-red-700">{detail.rejectReason}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Thời gian nộp đơn</p>
                          <p className="text-sm">{new Date(detail.appliedAt).toLocaleString("vi-VN")}</p>
                        </div>

                        {detail.reviewedAt && (
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Thời gian duyệt</p>
                            <p className="text-sm">{new Date(detail.reviewedAt).toLocaleString("vi-VN")}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Trạng thái điểm danh</p>
                          <div>{getCheckinStatusBadge(detail.checkInStatus)}</div>
                        </div>

                        {detail.checkInTime && (
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Thời gian điểm danh</p>
                            <p className="text-sm font-medium text-green-700">
                              {new Date(detail.checkInTime).toLocaleString("vi-VN")}
                            </p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )
            ) : (
              <p className="text-center text-gray-500 py-8">Đang tải...</p>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setDetailSession(null)}
                className="px-6 py-2 bg-[#355C7D] text-white rounded-full hover:bg-[#2a4d66]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default CheckinPage;
