// src/pages/admin/users/UserFormPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useRouter } from "@tanstack/react-router";
import {
  Save,
  ArrowLeft,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  UserResource,
  CreateUserRequest,
  UpdateUserRequest,
} from "@/types/user.type";
import { Gender } from "@/enum/gender";
import {
  useUserById,
  useCreateUser,
  useUpdateUser,
  useToggleStatus,
} from "@/hooks/user.hook";
import { UserStatus } from "@/enum/status.enum";
const PLACEHOLDER_AVATAR =
  "https://placehold.co/300x300?text=Avatar";

type StatusToggleButtonProps = {
  id?: string;
  status?: string;
  onToggled?: (newStatus: string) => void;
};

const StatusToggleButton: React.FC<StatusToggleButtonProps> = ({ id, status, onToggled }) => {
  const { mutate: toggleStatus, isPending: isToggling } = useToggleStatus();

  const handleToggle = () => {
    if (!id) return;
    toggleStatus(id, {
      onSuccess: (res: any) => {
        if (onToggled) onToggled(res.newStatus);
      },
    });
  };

  const isActive = status === "ACTIVE";
  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isToggling}
      className={`px-4 py-2 rounded-full text-sm ${isActive ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-600 text-white hover:bg-green-700'} disabled:opacity-50`}
    >
      {isToggling ? "Đang..." : isActive ? "Khoá" : "Mở"}
    </button>
  );
};

const UserFormPage: React.FC = () => {
  const { id } = useParams({ strict: false });
  const isEditMode = !!id;

  const navigate = useNavigate();
  const router = useRouter();

  const { mutate: createUser, isPending: isCreating } =
    useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } =
    useUpdateUser();

  const { data: userData, isLoading } = useUserById(id);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState<UserResource>({
    id: id ?? "",
    email: "",
    status: "ACTIVE" as UserStatus,
    profile: {
      full_name: "",
      phone: "",
      age: undefined,
      gender: "" as Gender,
      address: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    if (isEditMode && userData) {
      setFormData(userData);
    }
  }, [isEditMode, userData]);

  /* =========================
     HANDLERS
  ========================= */
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [name]: value },
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateUserRequest | UpdateUserRequest = {
      fullName: formData.profile?.full_name || "",
      email: formData.email || "",
      phone: formData.profile?.phone || "",
      age: formData.profile?.age
        ? Number(formData.profile.age)
        : undefined,
      gender: formData.profile?.gender,
      address: formData.profile?.address,
      avatarUrl: formData.profile?.avatar_url,
    };

    if (isEditMode && id) {
      updateUser({ id, data: payload });
    } else {
      createUser(payload);
    }
  };

  /* =========================
     LOADING
  ========================= */
  if (isEditMode && isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="text-gray-500 animate-pulse">
          Đang tải dữ liệu người dùng...
        </div>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex gap-2 items-center mb-6">
        <button
          onClick={() => navigate({ to: "/admin/users" })}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          {isEditMode ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border p-6 space-y-8"
      >
        {/* =========================
           AVATAR
        ========================= */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Ảnh đại diện
          </label>

          <div className="w-40 h-40 rounded-full overflow-hidden border bg-gray-100 mb-3">
            <img
              src={formData.profile?.avatar_url || PLACEHOLDER_AVATAR}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  PLACEHOLDER_AVATAR;
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <ImageIcon size={18} className="text-gray-500" />
            <input
              type="text"
              name="avatar_url"
              placeholder="Dán URL ảnh đại diện"
              value={formData.profile?.avatar_url || ""}
              onChange={handleProfileChange}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        {/* =========================
           FORM INPUTS
        ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full name */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <User size={16} /> Họ và tên *
            </label>
            <input
              required
              type="text"
              name="full_name"
              value={formData.profile?.full_name}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <Mail size={16} /> Email *
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <Phone size={16} /> Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={formData.profile?.phone}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Tuổi
            </label>
            <input
              type="number"
              name="age"
              value={formData.profile?.age ?? ""}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Giới tính
            </label>
            <select
              name="gender"
              value={formData.profile?.gender ?? ""}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value={Gender.MALE}>Nam</option>
              <option value={Gender.FEMALE}>Nữ</option>
            </select>
          </div>

          {/* Status (read-only + toggle) */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Trạng thái
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                name="status"
                readOnly
                value={
                  formData.status === "ACTIVE"
                    ? "Đang hoạt động"
                    : "Ngưng hoạt động"
                }
                className="flex-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
              />
              {typeof window !== "undefined" && localStorage.getItem("role") === "ADMIN" ? (
                <StatusToggleButton
                  status={formData.status}
                  id={formData.id}
                  onToggled={(newStatus) =>
                    setFormData((prev) => ({ ...prev, status: newStatus as UserStatus }))
                  }
                />
              ) : null}
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <MapPin size={16} /> Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={formData.profile?.address}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.history.back()}
            className="px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>

          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="flex items-center gap-2 px-6 py-2 bg-[#355C7D] text-white rounded-full text-sm hover:bg-[#26415D] disabled:opacity-50"
          >
            <Save size={16} />
            {isCreating || isUpdating
              ? "...Đang xử lý"
              : isEditMode
                ? "Cập nhật"
                : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFormPage;
