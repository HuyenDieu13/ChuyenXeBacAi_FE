import React from "react";
import { Outlet } from "@tanstack/react-router";
import Nen1 from "@/assets/images/Nen1.png"; // ảnh minh họa bên phải
import Nen2 from "@/assets/images/Nen2.jpg"; // ảnh nền lớn

const AuthLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Nen2})` }}
    >
      <div className="flex w-[1000px] h-[550px] rounded-[30px] bg-white/40 backdrop-blur-xl shadow-lg overflow-hidden border border-white/40">
        {/* LEFT: nơi chứa Outlet (Login hoặc SignIn) */}
        <div className="w-1/2 h-full flex flex-col justify-center px-10 bg-white/40 backdrop-blur-sm border-r border-white/40 relative">
          <div className="absolute inset-0 rounded-[30px] border border-white/50 pointer-events-none"></div>

          <div className="relative z-10">
            <Outlet /> {/* 👈 Nơi sẽ render LoginPage hoặc SignInPage */}
          </div>
        </div>

        {/* RIGHT: ảnh minh họa */}
        <div className="w-1/2 flex items-center justify-center relative">
          <img
            src={Nen1}
            alt="illustration"
            className="w-[350px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
