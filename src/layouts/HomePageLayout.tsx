import React, { useState } from "react";
import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, } from "lucide-react";
import { FaTwitter, FaInstagram, FaFacebook, FaPinterest } from "react-icons/fa";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Trang chủ", to: "/home"},
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

  return (
    <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat">
      {/* HEADER */}
      <header className="shadow-md px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center fixed w-full bg-white z-20">
        {/* Logo */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <img src={logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <h1 className="text-lg sm:text-2xl font-bold font-heading text-gray-800">
            Chuyến Xe Bác Ái
          </h1>
        </div>

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

        {/* Menu Mobile */}
        <button
          className="md:hidden text-gray-700 hover:text-yellow-500 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Dropdown Mobile */}
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
        </div>
      )}

      {/* Nội dung chính */}
      <main className="pt-16 md:pt-16">
        <Outlet />
      </main>
      {/* ================= FOOTER ================= */}
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

          <div>
            <h3 className="text-sm font-bold uppercase text-yellow-400 mb-3 tracking-wider">
              Giới thiệu
            </h3>
            <ul className="space-y-1 text-sm text-white/90 mb-4">
              <li>Về tổ chức</li>
              <li>Người sáng lập</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-yellow-400 mb-3 tracking-wider">
              Liên hệ
            </h3>
            <ul className="space-y-1 text-sm text-white/90">
              <li>Form góp ý</li>
              <li>Thông tin liên hệ</li>
            </ul>
          </div>


        </div>
      </footer>

    </div>
  );
};

export default HomePageLayout;
