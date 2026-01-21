import React, { useEffect, useState } from "react";
import { X, Check, Trash2, User, AlertCircle } from "lucide-react";
import { useGetDashboardAnomalies, useManualReconcileDecide } from "@/hooks/finance.hook";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { campaignService } from "@/services/campaign.service";
import { CampaignDetailResponse } from "@/types/campaign.type";
import CustomDropdown from "@/components/DropdownComponent";
import { useCampaigns } from "@/hooks/campaign.hook";
import { manualReconcileDecideRequest } from "@/types/content_finance.type";
interface AnomalyVM {
  id: string;
  status: "INFO" | "WARNING" | "ERROR";
  amount: number;
  description: string;
  donorName: string;
  aiSuggestionId?: string;
  time?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  campaignId: string;
  onDelete: (bankStmtId: string) => void;
}

const DashboardAnomaliesModal: React.FC<Props> = ({
  open,
  onClose,
  onDelete,
}) => {
  const { data, isLoading } = useGetDashboardAnomalies();
  const { data: campaignsData } = useCampaigns({ q: "" });
  const [selectedCampaignId, setSelectedCampaignId] = React.useState<string>("");

  const manualDecideMutation = useManualReconcileDecide();
  const queryClient = useQueryClient();
  const [campaignMap, setCampaignMap] = useState<
    Record<string, { data: CampaignDetailResponse | null; loading: boolean }>
  >({});
  const campaignOptions = campaignsData?.map((c) => ({
    label: c.title ?? "",
    value: c.id,
  })) ?? [];

  useEffect(() => {
    if (isLoading || !data) return;

    const ids = Array.from(
      new Set(
        data
          .map((a: any) => a.aiSuggestionId)
          .filter((id): id is string => !!id)
      )
    );

    const missingIds = ids.filter(
      (id) => !campaignMap[id]
    );

    if (missingIds.length === 0) return;

    setCampaignMap((prev) => {
      const next = { ...prev };
      missingIds.forEach((id) => {
        next[id] = { data: null, loading: true };
      });
      return next;
    });

    Promise.all(
      missingIds.map(async (id) => {
        try {
          const res = await campaignService.getCampaignById(id);
          return { id, data: res };
        } catch {
          return { id, data: null };
        }
      })
    ).then((results) => {
      setCampaignMap((prev) => {
        const next = { ...prev };
        results.forEach((r) => {
          next[r.id] = { data: r.data, loading: false };
        });
        return next;
      });
    });
  }, [data, isLoading]);

  const [selectedCampaignMap, setSelectedCampaignMap] = useState<
    Record<string, string | undefined>
  >({});
  const resolveCampaignId = (item: AnomalyVM) => {
    // Prefer user-selected mapping for this bank statement, fallback to AI suggestion
    return (
      selectedCampaignMap[item.id] ||
      item.aiSuggestionId
    );
  };

  useEffect(() => {
    if (!data) return;

    setSelectedCampaignMap((prev) => {
      const next = { ...prev };

      data.forEach((i: any) => {
        const id = i.bank_stmt_id;
        const aiCampaignId =
          typeof i.aiSuggestionId === "string" && i.aiSuggestionId.trim()
            ? i.aiSuggestionId
            : undefined;

        // Chỉ set lần đầu, KHÔNG overwrite khi user đã chọn
        if (!next[id]) {
          next[id] = aiCampaignId;
        }
      });

      return next;
    });
  }, [data]);

  if (!open) return null;

  const anomalies: AnomalyVM[] = (data ?? []).map((i: any) => {
    let mappedStatus: "INFO" | "WARNING" | "ERROR";

    switch (i.status) {
      case "GREEN":
        mappedStatus = "INFO";
        break;
      case "YELLOW":
        mappedStatus = "WARNING";
        break;
      default:
        mappedStatus = "ERROR";
    }

    return {
      id: i.bank_stmt_id,
      status: mappedStatus,
      amount: Number(i.amount ?? 0),
      description: i.description ?? "—",
      donorName: i.aiDonorName || "",
      aiSuggestionId:
        typeof i.aiSuggestionId === "string" && i.aiSuggestionId.trim()
          ? i.aiSuggestionId
          : undefined,
      time: i.bank_time,
    };
  });


  const handleDecide = (item: AnomalyVM) => {
    if (!item.id) return;

    const campaignToUse = resolveCampaignId(item);
    if (!campaignToUse) {
      toast.error("Vui lòng chọn chiến dịch trước khi duyệt");
      return;
    }

    const payload: manualReconcileDecideRequest = {
      bankStmtId: item.id,
      campaignId: campaignToUse,
      donorName: item.donorName || "Người dùng ẩn danh",
      note: `Duyệt giao dịch từ AI phát hiện: ${item.description}`,
    };

    manualDecideMutation.mutate(payload, {
      onSuccess: () => {
        try {
          queryClient.setQueryData(["dashboard-anomalies"], (old: any) => {
            if (!old) return old;
            return (old as any[]).filter((a) => a.bank_stmt_id !== payload.bankStmtId);
          });
        } catch (e) {
          // ignore cache update errors
        }
      },
      onError: (err: any) => {
        console.error("Chi tiết lỗi Validation:", err.response?.data?.errors);
        toast.error("Không thể duyệt. Vui lòng kiểm tra lại thông tin.");
      },
    });
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[760px] rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <AlertCircle className="text-amber-500" size={20} />
              AI phát hiện giao dịch bất thường
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isLoading ? (
            <div className="py-20 text-center text-slate-400 italic">Đang tải dữ liệu...</div>
          ) : anomalies.length === 0 ? (
            <div className="py-20 text-center text-slate-400">Không có giao dịch bất thường.</div>
          ) : (
            anomalies.map((item) => {
              const style =
                item.status === "INFO"
                  ? { bg: "bg-blue-50 border-blue-100", label: "text-blue-700", btn: "bg-blue-600 hover:bg-blue-700" }
                  : item.status === "WARNING"
                    ? { bg: "bg-amber-50 border-amber-200", label: "text-amber-700", btn: "bg-amber-600 hover:bg-amber-700" }
                    : { bg: "bg-red-50 border-red-100", label: "text-red-700", btn: "bg-red-600 hover:bg-red-700" };

              return (
                <div key={item.id} className={`rounded-xl border p-4 flex justify-between items-start gap-4 ${style.bg}`}>
                  <div className="flex-1">
                    <div
                      className={`
                        mb-3 flex items-center gap-2 rounded-lg px-3 py-2
                        border-l-4
                        ${item.aiSuggestionId
                          ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                          : "bg-slate-100 border-slate-400 text-slate-600"
                        }
                      `}
                    >
                      <AlertCircle size={14} className="shrink-0" />

                      <span className="text-xs font-semibold uppercase tracking-wide">
                        Gợi ý chiến dịch
                      </span>

                      <span className="mx-1 text-slate-400">•</span>

                      {item.aiSuggestionId ? (
                        <span className="text-sm font-bold">
                          {campaignMap[item.aiSuggestionId]?.loading
                            ? "Đang phân tích..."
                            : campaignMap[item.aiSuggestionId]?.data?.title ?? "Không xác định"}
                        </span>
                      ) : (
                        <span className="text-sm italic">
                          AI chưa xác định
                        </span>
                      )}
                    </div>


                    <div className="flex items-center gap-3 mb-1.5">
                      <p className={`font-bold text-xl ${style.label}`}>
                        {item.amount.toLocaleString("vi-VN")}₫
                      </p>
                    </div>

                    <p className="text-sm text-slate-700 font-medium mb-2 uppercase italic">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white/50 w-fit px-2 py-1 rounded">
                      <User size={12} />
                      <span>Người gửi: <strong>{item.donorName || "Chưa nhận diện"}</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <CustomDropdown
                      key={`campaign-select-${item.id}-${selectedCampaignMap[item.id] ?? item.aiSuggestionId ?? ""}`}
                      label="Chiến dịch"
                      options={campaignOptions}
                      defaultValue={selectedCampaignMap[item.id] ?? item.aiSuggestionId ?? undefined}
                      onChange={(value) =>
                        setSelectedCampaignMap((prev) => ({ ...prev, [item.id]: value }))
                      }
                      className="mt-2"
                    />


                    {item.status === "WARNING" && (
                      <button
                        disabled={manualDecideMutation.isPending}
                        onClick={() => handleDecide(item)}
                        className={`px-6 py-2 text-sm font-bold rounded-lg text-white ${style.btn} disabled:opacity-50`}
                      >
                        {manualDecideMutation.isPending ? "..." : "Duyệt ngay"}
                      </button>
                    )}
                    {item.status === "ERROR" && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="px-6 py-2 text-sm font-bold rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Xóa bỏ
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-50 border-t rounded-b-2xl text-[10px] text-slate-400 flex justify-between">
          <span>Hệ thống hỗ trợ đối soát tự động</span>
          <button onClick={onClose} className="font-bold hover:text-slate-700">ĐÓNG</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnomaliesModal;