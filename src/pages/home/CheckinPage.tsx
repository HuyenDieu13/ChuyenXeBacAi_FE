import React, { useState, useEffect } from "react";
import { QrCode, CheckCircle, Calendar, MapPin, Loader2 } from "lucide-react";

/**
 * 🟡 Mock dữ liệu buổi TNV đã đăng ký
 */
interface CheckinTicket {
  id: string;
  campaign: string;
  session: string;
  date: string;
  location: string;
  status: "REGISTERED" | "CHECKED_IN" | "DONE";
  qrUrl: string;
}

const mockCheckins: CheckinTicket[] = [
  {
    id: "tk1",
    campaign: "Trung Thu Ấm Áp",
    session: "Buổi sáng 06/11/2025",
    date: "2025-11-06",
    location: "Trường Tiểu học Bình An, Quảng Nam",
    status: "REGISTERED",
    qrUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/QR_code_for_mobile_English_Wikipedia.svg",
  },
];

const CheckinPage: React.FC = () => {
  const [checkins, setCheckins] = useState<CheckinTicket[]>(mockCheckins);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [checkedIn, setCheckedIn] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🟢 Giả lập hành động quét QR + gọi backend
  const handleScanQR = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      // 👉 Giả lập phản hồi thành công từ backend
      setCheckins((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "CHECKED_IN" } : t
        )
      );
      setCheckedIn(id);
      setLoadingId(null);
      alert("✅ Điểm danh thành công! Hệ thống đã ghi nhận.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-16">
      {/* HEADER SECTION */}
      <section className="text-center py-10 bg-gradient-to-r from-yellow-200 via-yellow-100 to-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-2">
          Điểm Danh Hoạt Động (QR Check-in)
        </h1>
        <p className="text-gray-600">
          Quét mã QR tại địa điểm để xác nhận có mặt trong buổi hoạt động.
        </p>
      </section>

      {/* CHECK-IN LIST */}
      <div className="max-w-3xl mx-auto mt-10 px-4 grid gap-6">
        {checkins.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* QR Code */}
              <img
                src={ticket.qrUrl}
                alt="QR Code"
                className="w-48 h-48 border rounded-2xl"
              />

              {/* Info */}
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {ticket.campaign}
                </h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <Calendar size={18} />
                  {ticket.session} • {ticket.date}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin size={18} />
                  {ticket.location}
                </p>

                {/* Status / Action */}
                <div className="mt-3">
                  {ticket.status === "REGISTERED" && (
                    <button
                      onClick={() => handleScanQR(ticket.id)}
                      disabled={loadingId === ticket.id}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-full shadow-md transition flex items-center gap-2"
                    >
                      {loadingId === ticket.id ? (
                        <>
                          <Loader2 className="animate-spin" size={18} /> Đang quét...
                        </>
                      ) : (
                        <>
                          <QrCode size={18} /> Quét mã QR
                        </>
                      )}
                    </button>
                  )}

                  {ticket.status === "CHECKED_IN" && (
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle size={18} />
                      Đã điểm danh thành công
                    </div>
                  )}

                  {ticket.status === "DONE" && (
                    <p className="text-blue-500 font-medium">
                      Hoàn thành buổi hoạt động 🎉
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckinPage;
