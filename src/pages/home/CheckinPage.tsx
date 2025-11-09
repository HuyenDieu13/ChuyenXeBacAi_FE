import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  QrCode,
  CheckCircle,
  Calendar,
  MapPin,
  Loader2,
  Camera,
  X,
} from "lucide-react";
import QRCode from "qrcode";
import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";

// ============================
// 🔶 TYPE & MOCK DATA
// ============================
type TicketStatus = "REGISTERED" | "CHECKED_IN" | "DONE";

interface CheckinTicket {
  id: string;
  campaign: string;
  session: string;
  date: string;
  location: string;
  status: TicketStatus;
}

const mockCheckins: CheckinTicket[] = [
  {
    id: "tk1",
    campaign: "Trung Thu Ấm Áp",
    session: "Buổi sáng 06/11/2025",
    date: "2025-11-06",
    location: "Trường Tiểu học Bình An, Quảng Nam",
    status: "REGISTERED",
  },
];

// ============================
// 🔶 HELPER FUNCTIONS
// ============================

function toBase64Utf8(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function buildQrPayload(t: CheckinTicket) {
  const base = {
    type: "CXBA_CHECKIN_V1",
    id: t.id,
    date: t.date,
    session: t.session,
    campaign: t.campaign,
  };
  const checksum = toBase64Utf8(`${t.id}|${t.date}|${t.session}`).slice(0, 12);
  return JSON.stringify({ ...base, checksum });
}

async function generateQrDataURL(payload: string) {
  return QRCode.toDataURL(payload, {
    margin: 1,
    errorCorrectionLevel: "M",
    width: 512,
    color: { dark: "#000000", light: "#FFFFFF" },
  });
}

// ============================
// 🔶 QR SCANNER MODAL
// ============================
const Scanner: React.FC<{
  open: boolean;
  onClose: () => void;
  onScanned: (text: string) => void;
}> = ({ open, onClose, onScanned }) => {
  const scannerId = useMemo(
    () => `scanner-${Math.random().toString(36).slice(2)}`,
    []
  );
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if (!open) return;

    (async () => {
      const { Html5QrcodeScanner } = await import("html5-qrcode");
      // @ts-ignore
      const scanner = new Html5QrcodeScanner(scannerId, {
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true,
      });
      instanceRef.current = scanner;
      scanner.render(
        (decodedText: string) => {
          onScanned(decodedText);
        },
        () => {}
      );
    })();

    return () => {
      if (instanceRef.current) {
        instanceRef.current.clear().catch(() => {});
        instanceRef.current = null;
      }
    };
  }, [open, onScanned, scannerId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#355C7D]">
            Quét mã QR
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>
        <div id={scannerId} className="w-full" />
        <p className="text-xs text-gray-500 mt-2">
          Nếu không thấy camera, hãy cấp quyền truy cập cho trình duyệt.
        </p>
      </div>
    </div>
  );
};

// ============================
// 🔶 MAIN COMPONENT
// ============================
const CheckinPage: React.FC = () => {
  const [checkins, setCheckins] = useState<CheckinTicket[]>(mockCheckins);
  const [qrMap, setQrMap] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [scanOpen, setScanOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate QR for all tickets
  useEffect(() => {
    let mounted = true;
    (async () => {
      const entries = await Promise.all(
        checkins.map(async (t) => {
          const payload = buildQrPayload(t);
          const url = await generateQrDataURL(payload);
          return [t.id, url] as const;
        })
      );
      if (mounted) setQrMap(Object.fromEntries(entries));
    })();
    return () => {
      mounted = false;
    };
  }, [checkins]);

  function validateAndFindTicket(payloadText: string): CheckinTicket | null {
    try {
      const parsed = JSON.parse(payloadText);
      if (parsed?.type !== "CXBA_CHECKIN_V1") return null;
      const { id, date, session, checksum } = parsed;
      const expected = toBase64Utf8(`${id}|${date}|${session}`).slice(0, 12);
      if (checksum !== expected) return null;
      return checkins.find(
        (x) => x.id === id && x.date === date && x.session === session
      ) ?? null;
    } catch {
      return null;
    }
  }

  const handleScanned = (text: string) => {
    setScanOpen(false);
    const ticket = validateAndFindTicket(text);
    if (!ticket) {
      alert("❌ Mã QR không hợp lệ hoặc không khớp vé.");
      return;
    }
    setLoadingId(ticket.id);
    setTimeout(() => {
      setCheckins((prev) =>
        prev.map((t) =>
          t.id === ticket.id ? { ...t, status: "CHECKED_IN" } : t
        )
      );
      setLoadingId(null);
      alert("✅ Điểm danh thành công! Hệ thống đã ghi nhận.");
    }, 800);
  };

  const dataBanner = {
    title: "Điểm danh hoạt động",
    content:
      "Quét mã QR tại địa điểm để xác nhận có mặt và ghi nhận sự đóng góp của bạn trong mỗi hành trình yêu thương.",
    buttonText: "Xem hướng dẫn",
  };

  return (
    <div className="w-full flex flex-col items-center overflow-hidden scroll-smooth bg-[#F9FAFB]">
      {/* Banner */}
      <BannerCustomComponent
        title={dataBanner.title}
        content={dataBanner.content}
        buttonText={dataBanner.buttonText}
      />
      <div className="max-w-7xl px-4 py-6 flex flex-col items-start w-full">
        <BreadcrumbRibbon label="Điểm danh hoạt động" className="mb-4" />
      </div>

      {/* Global scanner button */}
      <div className="w-full max-w-7xl px-4 sm:px-8">
        <button
          onClick={() => setScanOpen(true)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#355C7D] text-white hover:opacity-90 transition"
        >
          <Camera size={18} /> Mở camera quét QR
        </button>
      </div>

      {/* Tickets */}
      <section className="w-full max-w-7xl px-4 sm:px-8 py-4 sm:py-8 grid grid-cols-1 gap-8">
        {checkins.map((ticket) => (
          <div
            key={ticket.id}
            className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* QR Image */}
              {qrMap[ticket.id] ? (
                <img
                  src={qrMap[ticket.id]}
                  alt={`QR ${ticket.id}`}
                  className="w-44 h-44 sm:w-48 sm:h-48 border-2 border-yellow-200 rounded-2xl object-contain bg-[#F9FAFB]"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center border-2 border-yellow-200 rounded-2xl">
                  <Loader2 className="animate-spin" />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 space-y-3 font-body">
                <h3 className="text-2xl font-extrabold text-[#355C7D]">
                  {ticket.campaign}
                </h3>
                <p className="text-gray-600 flex items-center gap-2 text-sm">
                  <Calendar size={18} className="text-[#89CFF0]" />
                  {ticket.session} • {ticket.date}
                </p>
                <p className="text-gray-600 flex items-center gap-2 text-sm">
                  <MapPin size={18} className="text-[#89CFF0]" />
                  {ticket.location}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  {ticket.status === "REGISTERED" && (
                    <button
                      onClick={() => setScanOpen(true)}
                      disabled={loadingId === ticket.id}
                      className="flex items-center justify-center gap-2 bg-[#FEC84B] hover:bg-[#FBBF24] text-white font-medium rounded-full px-5 py-2.5 shadow-md transition disabled:opacity-80"
                    >
                      {loadingId === ticket.id ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Đang quét...
                        </>
                      ) : (
                        <>
                          <QrCode size={18} />
                          Quét mã QR
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

                <p className="text-xs text-gray-500">
                  Gợi ý: TNV mở trang này trên điện thoại và đưa mã QR cho BTC
                  quét.
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Scanner Modal */}
      <Scanner
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        onScanned={handleScanned}
      />
    </div>
  );
};

export default CheckinPage;
