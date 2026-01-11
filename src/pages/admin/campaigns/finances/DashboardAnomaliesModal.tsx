import React from "react";
import { X, Check, Trash2, User, AlertCircle } from "lucide-react";
import { useGetDashboardAnomalies, useManualReconcileDecide } from "@/hooks/finance.hook";

interface AnomalyVM {
  id: string;
  status: "INFO" | "WARNING" | "ERROR";
  amount: number;
  description: string;
  donorName: string;
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
  campaignId,
  onDelete,
}) => {
  const { data, isLoading } = useGetDashboardAnomalies();
  const manualDecideMutation = useManualReconcileDecide();

  if (!open) return null;

  const anomalies: AnomalyVM[] = (data ?? []).map((i: any) => {
    let mappedStatus: "INFO" | "WARNING" | "ERROR" = "ERROR";
    if (i.status === "YELLOW" || i.status === "WARNING") mappedStatus = "WARNING";
    else if (i.status === "BLUE" || i.status === "INFO") mappedStatus = "INFO";

    return {
      id: i.bank_stmt_id,
      status: mappedStatus,
      amount: Number(i.amount ?? 0),
      description: i.description ?? "—",
      donorName: i.aiDonorName || "", // Để rỗng nếu null để xử lý logic bên dưới
      time: i.bank_time,
    };
  });

  const handleDecide = (item: AnomalyVM) => {
    if (!item.id) return;

    // KHẮC PHỤC LỖI 400: Gửi đúng các trường Backend yêu cầu (Note và DonorName)
    const payload = {
      bank_stmt_id: item.id,
      bankStmtId: item.id, // Dự phòng key
      donorName: item.donorName || "Người dùng ẩn danh", // Backend bắt buộc có DonorName
      note: `Duyệt giao dịch từ AI phát hiện: ${item.description}`, // Backend bắt buộc có Note
    };

    manualDecideMutation.mutate(
      payload as any,
      {
        onSuccess: (res) => {
          alert(res?.message || "Đã duyệt giao dịch thành công");
        },
        onError: (err: any) => {
          console.error("Chi tiết lỗi Validation:", err.response?.data?.errors);
          alert("Không thể duyệt. Vui lòng kiểm tra lại thông tin người gửi.");
        },
      }
    );
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