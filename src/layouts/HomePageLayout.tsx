import React, { useState } from "react";
import { Outlet, Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Trang chủ", to: "/" },
  { label: "Hành trình", to: "/hanh-trinh" },
  { label: "Thành viên", to: "/thanh-vien" },
  { label: "Quỹ hành trình", to: "/quy" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Liên hệ", to: "/lien-he" },
];

const HomePageLayout: React.FC = () => {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat">
      {/* Header cố định */}
      <header className="shadow-md px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center fixed w-full bg-white z-20">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <img src={logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <h1 className="text-lg sm:text-2xl font-bold font-heading text-gray-800">
            Chuyến Xe Bác Ái
          </h1>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-heading text-base lg:text-xl">
          {navItems.map((item) => {
            const isActive = currentPath === item.to;
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

        {/* Nút menu mobile */}
        <button
          className="md:hidden text-gray-700 hover:text-yellow-500 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Menu mobile trượt xuống */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-10">
          {navItems.map((item) => {
            const isActive = currentPath === item.to;
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

      {/* Nội dung chính */}
      <main className="pt-20 md:pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default HomePageLayout;
