// src/pages/admin/volunteers/VolunteerPendingModal.tsx
import React, { useState } from "react";
import { X, UserCheck, User, Search, CheckCircle2, XCircle } from "lucide-react";
import { VolunteerResource } from "@/types/volunteer.type";

interface VolunteerPendingModalProps {
  open: boolean;
  onClose: () => void;
  pendingVolunteers: VolunteerResource[];
  onApprove: (volunteerId: string) => void;
  onReject: (volunteerId: string, reason?: string) => void;
}

const VolunteerPendingModal: React.FC<VolunteerPendingModalProps> = ({
  open,
  onClose,
  pendingVolunteers,
  onApprove,
  onReject,
}) => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  if (!open) return null;

  const filtered = pendingVolunteers.filter(
    (v) =>
      v.fullName.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id: string) => {
    onApprove(id);
    setSelectedId(null);
  };

  const handleReject = () => {
    if (selectedId && rejectReason.trim()) {
      onReject(selectedId, rejectReason);
      setSelectedId(null);
      setRejectReason("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#355C7D] to-[#26415D] text-white">
          <div className="flex items-center gap-3">
            <UserCheck size={24} />
            <h2 className="text-xl font-bold">
              Tình nguyện viên chờ duyệt ({pendingVolunteers.length})
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition">
            <X size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm shadow-sm focus:border-[#355C7D] focus:outline-none transition"
            />
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto max-h-96">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              {search ? "Không tìm thấy tình nguyện viên nào" : "Không có ai đang chờ duyệt"}
            </div>
          ) : (
            <div className="divide-y">
              {filtered.map((volunteer) => (
                <div key={volunteer.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full border flex items-center justify-center">
                      <User size={28} className="text-gray-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#355C7D]">{volunteer.fullName}</div>
                      <div className="text-sm text-gray-600">{volunteer.email}</div>
                      <div className="text-sm text-gray-500">SĐT: {volunteer.phone}</div>
                      {volunteer.adminNote && (
                        <div className="text-xs text-gray-500 italic mt-1">
                          Ghi chú: {volunteer.adminNote}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(volunteer.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-full shadow-sm transition"
                    >
                      <CheckCircle2 size={16} /> Duyệt
                    </button>
                    <button
                      onClick={() => setSelectedId(volunteer.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm transition"
                    >
                      <XCircle size={16} /> Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reject modal */}
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-red-600 mb-3">Từ chối tình nguyện viên</h3>
              <p className="text-sm text-gray-700 mb-3">
                Bạn có chắc chắn muốn <strong>từ chối</strong> ứng viên này?
              </p>
              <textarea
                rows={4}
                placeholder="Lý do từ chối (bắt buộc)..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
              />
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => {
                    setSelectedId(null);
                    setRejectReason("");
                  }}
                  className="px-4 py-2 text-sm border rounded-full hover:bg-gray-50 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full disabled:opacity-50 transition"
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerPendingModal;
