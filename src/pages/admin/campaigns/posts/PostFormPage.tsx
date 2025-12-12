// src/pages/admin/campaigns/posts/PostFormPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Upload, Image as ImageIcon } from "lucide-react";
import { adminCampaignDetailRoute } from "@/routes/admin";
import { demoPosts } from "./postData";
import { PostResource, PostStatus } from "@/types/post.type";
import { demoCampaigns } from "../campaignData"; // Để lấy banners từ chiến dịch
import { adminPostsRoute } from "@/routes/admin";
const PostFormPage: React.FC = () => {
    const navigate = useNavigate();

    const { id: campaignId } = useParams({ from: adminCampaignDetailRoute.id });
    const { postId } = useParams({ strict: false });

    const isEditMode = Boolean(postId);
    const existingPost = isEditMode
        ? demoPosts.find((p) => p.id === postId && p.campaignId === campaignId)
        : null;

    const campaign = demoCampaigns.find((c) => c.id === campaignId);
    const availableMedia = campaign?.banners || [];

    const [form, setForm] = useState<PostResource>(
        existingPost || {
            id: "",
            campaignId,
            title: "",
            content: "",
            image: "",
            status: PostStatus.DRAFT,
            createdAt: new Date().toISOString(),
        }
    );

    const [preview, setPreview] = useState<string | null>(existingPost?.image || null);
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const result = ev.target?.result as string;
                setPreview(result);
                setForm((prev) => ({ ...prev, image: result }));
                setSelectedMedia(null); // Clear selected media if uploading new
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectMedia = (url: string) => {
        setSelectedMedia(url);
        setPreview(url);
        setForm((prev) => ({ ...prev, image: url }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.content) {
            alert("Vui lòng nhập tiêu đề và nội dung!");
            return;
        }

        if (isEditMode) {
            const index = demoPosts.findIndex((p) => p.id === postId);
            if (index !== -1) {
                demoPosts[index] = { ...form, updatedAt: new Date().toISOString() };
            }
            alert("Cập nhật bài đăng thành công!");
        } else {
            const newPost = {
                ...form,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
            };
            demoPosts.push(newPost);
            alert("Tạo bài đăng mới thành công!");
        }

        navigate({ to: adminPostsRoute.id, params: { id: campaignId }    });
    };

    const handleBack = () => navigate({ to: adminPostsRoute.id, params: { id: campaignId } });

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-8">
                {/* HEADER */}
                <div className="flex items-center justify-between border-b pb-6">
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-[#355C7D]">
                            {isEditMode ? "Chỉnh sửa bài đăng" : "Tạo bài đăng mới"}
                        </h1>
                    </div>
                </div>

                {/* TIÊU ĐỀ */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề *</label>
                    <input
                        required
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Nhập tiêu đề bài đăng..."
                        className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
                    />
                </div>

                {/* NỘI DUNG */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung *</label>
                    <textarea
                        required
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Viết nội dung bài đăng..."
                        className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
                    />
                </div>

                {/* CHỌN ẢNH TỪ MEDIA HOẶC UPLOAD */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <ImageIcon className="inline mr-1" size={16} /> Ảnh bài đăng
                    </label>
                    <div className="space-y-4">
                        {/* Chọn từ media chiến dịch */}
                        <div>
                            <p className="text-sm font-medium mb-2">Chọn từ ảnh chiến dịch ({availableMedia.length} ảnh):</p>
                            <div className="grid grid-cols-4 gap-4">
                                {availableMedia.map((url, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleSelectMedia(url)}
                                        className={`relative w-full h-32 rounded-lg overflow-hidden border-2 transition ${selectedMedia === url ? "border-[#355C7D] scale-105" : "border-gray-300 hover:border-[#355C7D]"
                                            }`}
                                    >
                                        <img src={url} alt={`Media ${i + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hoặc upload mới */}
                        <div className="border-t pt-4">
                            <p className="text-sm font-medium mb-2">Hoặc upload ảnh mới:</p>
                            <div className="flex items-center gap-4">
                                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                                    {preview && !selectedMedia ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Upload size={32} className="text-gray-400" />
                                    )}
                                </div>
                                <input type="file" accept="image/*" onChange={handleUpload} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TRẠNG THÁI */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
                    >
                        <option value={PostStatus.DRAFT}>Nháp</option>
                        <option value={PostStatus.PUBLISHED}>Đăng ngay</option>
                        <option value={PostStatus.SCHEDULED}>Lên lịch</option>
                        <option value={PostStatus.ARCHIVED}>Lưu trữ</option>
                    </select>
                </div>

                {form.status === PostStatus.SCHEDULED && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Thời gian lên lịch</label>
                        <input
                            type="datetime-local"
                            name="scheduledAt"
                            value={form.scheduledAt || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
                        />
                    </div>
                )}

                {/* NÚT HÀNH ĐỘNG */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                    <button type="button" onClick={handleBack} className="px-8 py-3 border rounded-full hover:bg-gray-50 transition">
                        Hủy bỏ
                    </button>
                    <button type="submit" className="flex items-center gap-3 px-8 py-3 bg-[#355C7D] text-white rounded-full font-medium transition shadow-sm">
                        <Save size={20} />
                        {isEditMode ? "Cập nhật bài đăng" : "Tạo bài đăng"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostFormPage;