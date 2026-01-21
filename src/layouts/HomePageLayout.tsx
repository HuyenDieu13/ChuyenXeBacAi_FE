import React, { useState, useEffect, useRef } from "react";
import {
  Outlet,
  Link,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import { Menu, X, ArrowUp } from "lucide-react";
import { FaHandsHelping, FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import logo from "@/assets/Logo.png";
import avatarDefault from "@/assets/images/Home/avatar.jpg";
import { useLogout } from "@/hooks/auth.hooks";
import { useAuth } from "@/contexts/AuthProvider";

// 1. Import Gemini SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

// ============================
// 🟡 CẤU HÌNH GEMINI & INFO
// ============================
// ⚠️ QUAN TRỌNG: Hãy thay thế bằng API Key thật của bạn
// Lấy key từ file .env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// ============================
// 🟡 CẤU HÌNH KIẾN THỨC CHO AI (SYSTEM PROMPT)
// ============================
const ORG_INFO_PROMPT = `
Bạn là "Trợ lý ảo AI" tận tâm của tổ chức từ thiện "Chuyến Xe Bác Ái". 
Nhiệm vụ của bạn là giải đáp thắc mắc và hướng dẫn người dùng thực hiện các nghiệp vụ trên website.

DƯỚI ĐÂY LÀ DỮ LIỆU VÀ QUY TRÌNH NGHIỆP VỤ CỦA TỔ CHỨC:

1. THÔNG TIN TỔ CHỨC:
- Tên: Chuyến Xe Bác Ái (CXBA).
- Sứ mệnh: "Trao yêu thương - Nhận nụ cười". Kết nối các nhà hảo tâm và tình nguyện viên để hỗ trợ người nghèo, trẻ em vùng cao, bệnh nhân khó khăn.
- Địa chỉ trụ sở: 123 Đường Thiện Nguyện, Quận 1, TP. HCM.
- Hotline hỗ trợ: 1900 1234 (8:00 - 17:00 hàng ngày).
- Email: lienhe@chuyenxebacai.vn.

2. HƯỚNG DẪN QUYÊN GÓP (DONATE):
Khi người dùng muốn quyên góp, hãy cung cấp thông tin sau:
- Cách 1: Chuyển khoản ngân hàng (Khuyên dùng).
  + Ngân hàng: MB Bank (Quân Đội).
  + Số tài khoản: 9999 8888 7777.
  + Chủ tài khoản: QUY CHUYEN XE BAC AI.
  + Nội dung chuyển khoản: "Tên người gửi - SĐT - Tên chiến dịch (nếu có)".
- Cách 2: Quét mã QR tại trang chủ hoặc bấm nút "Quyên góp ngay" ở góc màn hình.
- Lưu ý: Mọi khoản đóng góp đều được công khai minh bạch tại trang "Quỹ hành trình".

3. HƯỚNG DẪN ĐĂNG KÝ TÌNH NGUYỆN VIÊN (MEMBER):
- Bước 1: Người dùng cần đăng ký tài khoản trên website (nút Đăng ký góc phải).
- Bước 2: Sau khi đăng nhập, cập nhật đầy đủ "Hồ sơ cá nhân" (SĐT, CMND/CCCD để xác minh danh tính).
- Bước 3: Vào mục "Hành trình", chọn chiến dịch đang mở và bấm "Đăng ký tham gia".
- Quyền lợi: Được cấp giấy chứng nhận tình nguyện, tích điểm đổi quà lưu niệm.

4. QUY TRÌNH THAM GIA HOẠT ĐỘNG (Dành cho user đã đăng nhập):
- Check-in: Khi đến địa điểm làm từ thiện, tình nguyện viên cần vào mục "Phiếu tham gia" để quét QR điểm danh.
- Nhiệm vụ: Vào mục "Nhiệm vụ" để xem công việc được Trưởng đoàn phân công (Ví dụ: Phân phát quà, Hỗ trợ y tế, Nấu ăn...).
- Thống kê: Sau hành trình, hệ thống sẽ cập nhật số giờ làm việc và đóng góp của bạn tại mục "Thống kê".

5. CÂU HỎI THƯỜNG GẶP (FAQ):
- "Quỹ có minh bạch không?": Có, chúng tôi sử dụng hệ thống sao kê tự động. Bạn có thể xem chi tiết dòng tiền ra/vào tại trang "Quỹ hành trình".
- "Tôi có thể quyên góp hiện vật không?": Có, vui lòng mang quần áo/sách vở đến trụ sở hoặc liên hệ hotline để xe của tổ chức đến nhận.

QUY TẮC TRẢ LỜI:
- Luôn xưng hô là "mình" hoặc "tôi" và gọi người dùng là "bạn" hoặc "quý nhà hảo tâm".
- Giọng văn: Ấm áp, lịch sự, khuyến khích làm việc thiện.
- Nếu người dùng hỏi về tính năng chưa có (VD: App mobile), hãy trả lời: "Tính năng này đang được đội ngũ kỹ thuật phát triển và sẽ sớm ra mắt ạ".
- Trả lời ngắn gọn, đi thẳng vào vấn đề, sử dụng tiếng Việt có dấu.
`;

// ============================
// 🟡 CẤU HÌNH MENU
// ============================
const baseNavItems = [
  { label: "Trang chủ", to: "/home" },
  { label: "Hành trình", to: "/journey" },
  { label: "Thành viên", to: "/members" },
  { label: "Quỹ hành trình", to: "/fund" },
  { label: "Giới thiệu", to: "/about" },
  { label: "Liên hệ", to: "/contact" },
];

const userNavItems = [
  { label: "Phiếu tham gia", to: "/checkin" },
];

const HomePageLayout: React.FC = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const logoutMutation = useLogout();

  // State UI
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Login state (use Auth context)
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);

  // Ẩn menu user khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hiển thị nút cuộn lên đầu trang
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleLogout = () => {
    logoutMutation.mutate();
    setShowUserMenu(false);
  };

  // ===== Component Donate Modal =====
  const DonateModal = () => (
    <div className="fixed inset-0 z-[999] bg-black/60 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] sm:w-[500px] relative animate-fadeIn">
        <button
          onClick={() => setShowDonateModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6 text-yellow-600">
          Quyên Góp Cho Hành Trình
        </h2>
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/QR_code_for_mobile_English_Wikipedia.svg"
            alt="QR Donate"
            className="w-40 h-40"
          />
          <p className="text-gray-600 text-sm">
            Quét mã QR hoặc điền thông tin bên dưới:
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Cảm ơn bạn đã quyên góp ❤️");
            setShowDonateModal(false);
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Họ và tên"
            required
            className="border rounded-full px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Số tiền (VNĐ)"
            required
            className="border rounded-full px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-full shadow-md transition"
          >
            Xác nhận quyên góp
          </button>
        </form>
      </div>
    </div>
  );

  // ==========================================
  // 🤖 CHAT POPUP VỚI GEMINI INTERGRATION
  // ==========================================
  const ChatPopup = () => {
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([
      { role: "model", text: "Xin chào! Tôi là trợ lý ảo của Chuyến Xe Bác Ái. Tôi có thể giúp gì cho bạn hôm nay?" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll xuống cuối khi có tin nhắn mới
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
      if (!input.trim() || isLoading) return;

      const userMessage = input;
      setInput("");
      // UI: Hiện tin nhắn user ngay lập tức
      setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
      setIsLoading(true);

      // Debug: Kiểm tra xem Key có chưa
      console.log("Check API Key:", API_KEY);

      if (!API_KEY) {
        setMessages((prev) => [...prev, { role: "model", text: "Lỗi: Chưa cấu hình API Key trong file .env" }]);
        setIsLoading(false);
        return;
      }

      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Dùng model flash cho nhanh và rẻ (bản miễn phí)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Chuẩn bị lịch sử: Loại bỏ tin nhắn chào mừng ban đầu để tránh lỗi logic
        // (Vì tin chào mừng là Model, nhưng Gemini muốn bắt đầu phiên bằng User prompt)
        const validHistory = messages
          .slice(1) // Bỏ qua câu "Xin chào..." đầu tiên
          .map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          }));

        const chat = model.startChat({
          history: [
            // 1. Huấn luyện (System Instruction)
            {
              role: "user",
              parts: [{ text: ORG_INFO_PROMPT }],
            },
            {
              role: "model",
              parts: [{ text: "OK, tôi đã hiểu nhiệm vụ." }],
            },
            // 2. Lịch sử chat thực tế (đã lọc)
            ...validHistory
          ],
        });

        // Gửi tin nhắn
        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        const text = response.text();

        setMessages((prev) => [...prev, { role: "model", text: text }]);
      } catch (error) {
        console.error("Gemini Error Chi Tiết:", error);
        setMessages((prev) => [
          ...prev,
          { role: "model", text: "Hệ thống đang bận, vui lòng thử lại sau." },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="fixed bottom-24 right-6 z-[999] bg-white rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col border border-gray-200 animate-fadeInUp">
        {/* Header Chat */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h4 className="font-semibold">Hỗ trợ trực tuyến</h4>
          </div>
          <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full transition">
            <FaTimes />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                ? "bg-blue-500 text-white self-end rounded-br-none"
                : "bg-white text-gray-700 self-start rounded-bl-none border border-gray-100"
                }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white text-gray-500 self-start p-3 rounded-xl text-xs italic border border-gray-100">
              Đang nhập...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t rounded-b-2xl flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập câu hỏi..."
            disabled={isLoading}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-sky-300 focus:outline-none text-sm transition"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaPaperPlane size={14} />
          </button>
        </div>
      </div>
    );
  };

  const fullMenu = [...baseNavItems, ...userNavItems];

  return (
    <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat">
      {/* HEADER */}
      <header className="shadow-md px-4 sm:px-6 lg:px-10 py-3 flex justify-between items-center fixed w-full bg-white z-20">
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={logo} alt="Logo" className="h-9 w-9 sm:h-10 sm:w-10" />
          <h1 className="text-lg sm:text-2xl font-bold font-heading text-gray-800 whitespace-nowrap">
            Chuyến Xe Bác Ái
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-heading text-base lg:text-xl">
            {fullMenu.map((item) => {
              const isActive =
                currentPath === item.to ||
                (item.to !== "/" && currentPath.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative transition-colors duration-300 ${isActive
                    ? "text-yellow-500 font-semibold"
                    : "text-gray-700 hover:text-yellow-500"
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-yellow-500 transition-all duration-300"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Avatar always visible; dropdown content depends on auth */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center"
              title={"Tài khoản"}
            >
              <img
                src={avatarDefault}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 hover:scale-105 hover:shadow-lg transition-all cursor-pointer"
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 border animate-fadeIn">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-yellow-50"
                    >
                      Hồ sơ cá nhân
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-50"
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Menu Mobile Button */}
          <button
            className="md:hidden text-gray-700 hover:text-yellow-500 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* DROPDOWN MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-10">
          {fullMenu.map((item) => {
            const isActive =
              currentPath === item.to ||
              (item.to !== "/" && currentPath.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`text-lg transition ${isActive
                  ? "text-yellow-500 font-semibold"
                  : "text-gray-700 hover:text-yellow-500"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#355C7D] text-white py-14 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Cột 1 */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Logo" className="h-10 w-10" />
              <h2 className="text-xl font-bold">Chuyến Xe Bác Ái</h2>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Nơi kết nối yêu thương và sẻ chia. Mỗi hành trình là một câu
              chuyện, mỗi tấm lòng là một nguồn sáng.
            </p>
          </div>

          {/* Cột 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Liên kết</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link to="/home" className="hover:underline">Trang chủ</Link></li>
              <li><Link to="/journey" className="hover:underline">Hành trình</Link></li>
              <li><Link to="/fund" className="hover:underline">Quỹ hành trình</Link></li>
              <li><Link to="/about" className="hover:underline">Giới thiệu</Link></li>
              <li><Link to="/contact" className="hover:underline">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-yellow-400 transition"><i className="fab fa-facebook-f"></i> Facebook</a>
              <a href="#" className="hover:text-yellow-400 transition"><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>

          {/* Cột 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
            <p className="text-sm opacity-90">📍 123 Đường Thiện Nguyện, TP. HCM</p>
            <p className="text-sm opacity-90">📞 0123 456 789</p>
            <p className="text-sm opacity-90">✉️ info@chuyenxebacai.vn</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm opacity-80">
          © {new Date().getFullYear()} Chuyến Xe Bác Ái — Lan tỏa yêu thương đến mọi miền.
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg flex justify-center items-center hover:scale-110 transition-transform duration-300"
            title="Lên đầu trang"
          >
            <ArrowUp size={22} />
          </button>
        )}
        <button
          onClick={() => setShowDonateModal(true)}
          className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg flex justify-center items-center hover:scale-110 transition-transform duration-300"
          title="Quyên góp ngay"
        >
          <FaHandsHelping className="text-xl" />
        </button>
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg flex justify-center items-center hover:scale-110 transition-transform duration-300"
          title="Trò chuyện cùng chúng tôi"
        >
          {showChat ? <FaTimes className="text-xl" /> : <FaComments className="text-xl" />}
        </button>
      </div>

      {/* Modals */}
      {showDonateModal && <DonateModal />}
      {showChat && <ChatPopup />}
    </div>
  );
};

export default HomePageLayout;