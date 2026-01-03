import React, { useState, useEffect, useRef } from "react";
import {
  Outlet,
  Link,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import { Menu, X, ArrowUp } from "lucide-react";
import { FaHandsHelping, FaComments, FaTimes } from "react-icons/fa";
import logo from "@/assets/logo.png";
import avatarDefault from "@/assets/images/Home/avatar.jpg";
import { useLogout } from "@/hooks/auth.hooks";

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

// Khi user đăng nhập, hiển thị thêm các mục này
const userNavItems = [
  { label: "Phiếu tham gia", to: "/checkin" },
  { label: "Nhiệm vụ", to: "/tasks" },
  { label: "Thống kê", to: "/stats" },
];

const HomePageLayout: React.FC = () => {
  const router = useRouterState();
  const navigate = useNavigate();
  const currentPath = router.location.pathname;
  const logoutMutation = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // =============================
  // 🔹 Login state tạm thời
  // =============================
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
  //   return !!localStorage.getItem("cxba_token");
  // });
  const isLoggedIn = true; // 🧩 TẠM MỞ SẴN login để test menu

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

  // Đăng xuất (tạm thời comment)
  const handleLogout = () => {
    logoutMutation();
    setShowUserMenu(false);
  };
  // ===== Donate Modal =====
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

  // ===== Chat Popup =====
  const ChatPopup = () => (
    <div className="fixed bottom-36 right-6 z-[999] bg-white rounded-2xl shadow-xl w-80 h-96 flex flex-col animate-fadeInUp">
      <div className="bg-sky-500 text-white p-3 rounded-t-2xl flex justify-between items-center">
        <h4 className="font-semibold">Chat Hỗ Trợ</h4>
        <button onClick={() => setShowChat(false)}>
          <FaTimes />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700">
        <p className="text-gray-500 italic">
          Xin chào 👋, tôi có thể giúp gì cho bạn?
        </p>
      </div>
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-sky-300 focus:outline-none text-sm"
        />
        <button className="bg-sky-500 text-white px-4 py-2 rounded-full hover:bg-sky-600">
          Gửi
        </button>
      </div>
    </div>
  );

  // =============================
  // 🔹 KẾT HỢP MENU CHÍNH + USER
  // =============================
  const fullMenu = [...baseNavItems, ...(isLoggedIn ? userNavItems : [])];

  return (
    <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat">
      {/* HEADER */}
      <header className="shadow-md px-4 sm:px-6 lg:px-10 py-3 flex justify-between items-center fixed w-full bg-white z-20">
        {/* LEFT: logo + text */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={logo} alt="Logo" className="h-9 w-9 sm:h-10 sm:w-10" />
          <h1 className="text-lg sm:text-2xl font-bold font-heading text-gray-800 whitespace-nowrap">
            Chuyến Xe Bác Ái
          </h1>
        </div>

        {/* RIGHT: navigation + avatar */}
        <div className="flex items-center gap-6">
          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-heading text-base lg:text-xl">
            {fullMenu.map((item) => {
              const isActive =
                currentPath === item.to ||
                (item.to !== "/" && currentPath.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative transition-colors duration-300 ${
                    isActive
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

          {/* Avatar login/logout */}
          <div className="relative" ref={menuRef}>
            <button
              // onClick={() =>
              //   isLoggedIn ? setShowUserMenu(!showUserMenu) : navigate({ to: "/login" })
              // }
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
              </div>
            )}
          </div>

          {/* Menu Mobile */}
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
                className={`text-lg transition ${
                  isActive
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
          {/* Cột 1 - Logo + mô tả */}
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

          {/* Cột 2 - Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Liên kết</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/home" className="hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/journey" className="hover:underline">
                  Hành trình
                </Link>
              </li>
              <li>
                <Link to="/fund" className="hover:underline">
                  Quỹ hành trình
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3 - Theo dõi chúng tôi */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-pinterest"></i> Pinterest
              </a>
            </div>
          </div>

          {/* Cột 4 - Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
            <p className="text-sm opacity-90">
              📍 123 Đường Thiện Nguyện, TP. HCM
            </p>
            <p className="text-sm opacity-90">📞 0123 456 789</p>
            <p className="text-sm opacity-90">✉️ info@chuyenxebacai.vn</p>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm opacity-80">
          © {new Date().getFullYear()} Chuyến Xe Bác Ái — Lan tỏa yêu thương đến
          mọi miền.
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
          onClick={() => setShowChat(true)}
          className="w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg flex justify-center items-center hover:scale-110 transition-transform duration-300"
          title="Trò chuyện cùng chúng tôi"
        >
          <FaComments className="text-xl" />
        </button>
      </div>

      {/* Modal + Chat */}
      {showDonateModal && <DonateModal />}
      {showChat && <ChatPopup />}
    </div>
  );
};

export default HomePageLayout;
