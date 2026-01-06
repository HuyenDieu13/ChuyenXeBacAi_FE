import React, { useState } from "react";

const VerifyOtpPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      setMessage("✅ Xác minh thành công!");
    } else {
      setMessage("❌ Mã OTP không đúng, vui lòng thử lại.");
    }
  };

  return (
    <div className="relative z-10 p-6 md:p-8">
      <h1 className="text-3xl font-extrabold text-[#355C7D] text-center mb-2">
        Xác minh Email
      </h1>
      <p className="text-center text-gray-600 mb-8 text-sm">
        Mã OTP đã được gửi đến email của bạn ✉️
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nhập mã OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="h-10 rounded-md border border-gray-200 px-4 text-center text-gray-700 
                     focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
        />
        {message && (
          <p className="text-center text-sm font-medium text-[#355C7D]">{message}</p>
        )}
        <button
          type="submit"
          className="h-10 rounded-md bg-[#FFB800] text-white font-semibold hover:bg-[#E6A400] transition"
        >
          Xác nhận
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Chưa nhận được mã?{" "}
        <span className="text-[#355C7D] font-semibold cursor-pointer hover:underline">
          Gửi lại OTP
        </span>
      </p>
    </div>
  );
};

export default VerifyOtpPage;
