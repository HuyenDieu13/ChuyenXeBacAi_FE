import React, { useState, useEffect } from "react";
import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUp } from "lucide-react";
import { FaTwitter, FaInstagram, FaFacebook, FaPinterest, FaHandsHelping, FaComments, FaTimes } from "react-icons/fa";
import logo from "@/assets/logo.png";
import avatar from "@/assets/images/Home/avatar.jpg";

const navItems = [
  { label: "Trang chủ", to: "/home" },
  { label: "Hành trình", to: "/journey" },
  { label: "Thành viên", to: "/members" },
  { label: "Quỹ hành trình", to: "/fund" },
  { label: "Giới thiệu", to: "/about" },
  { label: "Liên hệ", to: "/contact" },
];

const HomePageLayout: React.FC = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Hiện nút scroll to top khi cuộn xuống
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
            {navItems.map((item) => {
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

          {/* Avatar login (desktop) */}
          <Link to="/login" title="Đăng nhập">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-yellow-400 hover:scale-105 hover:shadow-lg transition-all cursor-pointer"
            />
          </Link>

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
          {navItems.map((item) => {
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
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <img
              src={avatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-yellow-400 hover:scale-105 transition"
            />
          </Link>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#355C7D] text-white py-14 px-6 sm:px-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-bold uppercase text-yellow-400 mb-3 tracking-wider">
              Hành trình
            </h3>
            <ul className="space-y-1 text-sm text-white/90">
              <li>Hành trình sắp diễn ra</li>
              <li>Hành trình đã diễn ra</li>
              <li>Hoạt động bên lề</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase text-yellow-400 mb-3 tracking-wider">
              Thành viên
            </h3>
            <ul className="space-y-1 text-sm text-white/90">
              <li>Danh sách thành viên</li>
              <li>Câu nói tiêu biểu</li>
              <li>Gương mặt đáng nhớ</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase text-yellow-400 mb-3 tracking-wider">
              Quỹ hành trình
            </h3>
            <ul className="space-y-1 text-sm text-white/90">
              <li>Tổng quan quỹ</li>
              <li>Bảng đóng góp</li>
              <li>Top ủng hộ</li>
              <li>Thống kê đóng góp</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-yellow-400 mb-3 tracking-wider">
              Email
            </h3>
            <div className="flex w-full bg-white rounded-md overflow-hidden mb-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 px-3 py-2 text-gray-700 text-sm outline-none"
              />
              <button className="bg-sky-300 hover:bg-sky-400 text-white px-4 text-sm font-semibold transition">
                Gửi
              </button>
            </div>
            <p className="text-[12px] text-white/70 mb-4">
              Your email is safe with us, we don’t spam.
            </p>

            <h4 className="text-sm font-semibold text-yellow-400 mb-3">
              Follow Me
            </h4>
            <div className="flex gap-4">
              <FaTwitter className="text-white hover:text-yellow-400 transition" />
              <FaInstagram className="text-white hover:text-yellow-400 transition" />
              <FaFacebook className="text-white hover:text-yellow-400 transition" />
              <FaPinterest className="text-white hover:text-yellow-400 transition" />
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      {/* FLOATING BUTTON GROUP */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg flex justify-center items-center hover:scale-110 transition-transform duration-300"
            title="Lên đầu trang"
          >
            <ArrowUp size={22} />
          </button>
        )}

        {/* Donate */}
        <button
          onClick={() => setShowDonateModal(true)}
          className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg flex justify-center items-center hover:scale-110 transition-transform duration-300"
          title="Quyên góp ngay"
        >
          <FaHandsHelping className="text-xl" />
        </button>

        {/* Chatbox */}
        <button
          onClick={() => setShowChat(true)}
          className="w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg flex justify-center items-center hover:scale-110 transition-transform duration-300"
          title="Trò chuyện cùng chúng tôi"
        >
          <FaComments className="text-xl" />
        </button>
      </div>
      {showDonateModal && <DonateModal />}
      {showChat && <ChatPopup />}
    </div>
  );
};

export default HomePageLayout;
