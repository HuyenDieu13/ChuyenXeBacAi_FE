import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCreateVolunteerApplication } from "@/hooks/volunteer-application.hook";
import type { Gender } from "@/types/volunteer-application.type";
import { CreateVolunteerApplicationRequest } from "@/types/volunteer-application.type";
const RegisterPage: React.FC = () => {
  const { mutate: CreateVolunteerApplicationRequest, isPending } = useCreateVolunteerApplication();

  const [formData, setFormData] = useState<CreateVolunteerApplicationRequest>({
    fullName: "",
    email: "",
    phone: "",
    age: 0,
    gender: "MALE" as Gender,
    address: "",
    skills: "",
    availability: "",
    applyReason: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.fullName || !formData.email) {
      setError("Vui lòng nhập Họ tên và Email.");
      return;
    }
    const payload: CreateVolunteerApplicationRequest = {
      ...formData,
    };
    CreateVolunteerApplicationRequest(payload);
  };

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-[#355C7D] text-center">
          Đăng ký tình nguyện viên
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Đơn sẽ ở trạng thái PENDING cho tới khi admin duyệt.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input" name="fullName" placeholder="Họ tên *" value={formData.fullName} onChange={handleChange} />
            <input className="input" name="email" type="email" placeholder="Email *" value={formData.email} onChange={handleChange} />
            <input className="input" name="phone" placeholder="SĐT" value={formData.phone} onChange={handleChange} />
            <input className="input" name="age" placeholder="Tuổi" value={formData.age} onChange={handleChange} />
          </div>

          <select className="input" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
          </select>

          <input className="input" name="address" placeholder="Địa chỉ" value={formData.address} onChange={handleChange} />
          <input className="input" name="skills" placeholder="Kỹ năng" value={formData.skills} onChange={handleChange} />
          <input className="input" name="availability" placeholder="Thời gian rảnh" value={formData.availability} onChange={handleChange} />

          <textarea className="input" rows={3} name="applyReason" placeholder="Lý do tham gia" value={formData.applyReason} onChange={handleChange} />

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          {success && <p className="text-green-600 text-xs text-center">{success}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 rounded-md bg-[#FFB800] text-white font-semibold hover:bg-[#E6A400] disabled:opacity-60"
          >
            {isPending ? "Đang gửi..." : "Gửi đăng ký"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-[#355C7D] font-semibold hover:underline">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
