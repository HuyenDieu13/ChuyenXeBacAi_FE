// src/pages/admin/campaigns/posts/PostFormPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";

import { adminCampaignDetailRoute, adminPostsRoute } from "@/routes/admin";
import { PostStatus } from "@/enum/status.enum";
import { demoCampaigns } from "../campaignData";
import { usePostById, useSavePost } from "@/hooks/post.hook";

/* ================= HARD CODE UPLOADER ID (TEST) ================= */
const HARD_CODE_UPLOADER_ID = "10000000-0000-0000-0000-000000000001";

/* ================= FORM STATE ================= */
type PostFormState = {
  title: string;
  contentMd: string;
  coverUrl: string;
  status: PostStatus;
};

const EMPTY_FORM: PostFormState = {
  title: "",
  contentMd: "",
  coverUrl: "",
  status: PostStatus.DRAFT,
};

const PostFormPage: React.FC = () => {
  const navigate = useNavigate();

  const { id: campaignId } = useParams({ from: adminCampaignDetailRoute.id });
  const { postId } = useParams({ strict: false });
  const isEditMode = Boolean(postId);

  /* ================= API ================= */
  const { data: postDetail, isLoading } = usePostById(postId);
  const savePostMutation = useSavePost(campaignId, HARD_CODE_UPLOADER_ID);

  /* ================= STATE ================= */
  const [form, setForm] = useState<PostFormState>(EMPTY_FORM);
  const [preview, setPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | undefined>();

  /* ================= FILL FORM WHEN EDIT ================= */
  useEffect(() => {
    if (postDetail && isEditMode) {
      setForm({
        title: postDetail.title ?? "",
        contentMd: postDetail.content_md ?? "",
        coverUrl: postDetail.cover_url ?? "",
        status: postDetail.status ?? PostStatus.DRAFT,
      });
      setPreview(postDetail.cover_url ?? null);
    }
  }, [postDetail, isEditMode]);

  /* ================= MEDIA ================= */
  const campaign = demoCampaigns.find((c) => c.id === campaignId);
  const availableMedia = campaign?.banners || [];

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSelectMedia = (url: string) => {
    setCoverFile(undefined);
    setPreview(url);
    setForm((prev) => ({ ...prev, coverUrl: url }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.contentMd) {
      alert("Vui lòng nhập tiêu đề và nội dung");
      return;
    }

    savePostMutation.mutate(
      {
        id: isEditMode ? postId : undefined,
        title: form.title,
        contentMd: form.contentMd,
        status: form.status,
        coverFile,
        coverUrl: form.coverUrl,
      },
      {
        onSuccess: () => {
          alert(isEditMode ? "Cập nhật thành công!" : "Tạo bài đăng thành công!");
          navigate({ to: adminPostsRoute.id, params: { id: campaignId } });
        },
        onError: (err) => {
          console.error(err);
          alert(err?.message || "Tạo/Cập nhật bài đăng thất bại");
        },
      }
    );
  };

  const handleBack = () =>
    navigate({ to: adminPostsRoute.id, params: { id: campaignId } });

  /* ================= RENDER ================= */
  if (isEditMode && isLoading) {
    return <div className="p-6 text-gray-500">Đang tải bài đăng...</div>;
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-6 space-y-8"
      >
        <div className="flex items-center gap-4 border-b pb-6">
          <button
            type="button"
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#355C7D]">
            {isEditMode ? "Chỉnh sửa bài đăng" : "Tạo bài đăng mới"}
          </h1>
        </div>

        {/* TITLE */}
        <div>
          <label className="block text-sm font-semibold mb-2">Tiêu đề *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm font-semibold mb-2">Nội dung *</label>
          <textarea
            name="contentMd"
            rows={6}
            value={form.contentMd}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* MEDIA */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            <ImageIcon size={16} className="inline mr-1" /> Ảnh bài đăng
          </label>

          <div className="grid grid-cols-4 gap-4 mb-4">
            {availableMedia.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectMedia(url)}
                className="border-2 rounded-lg overflow-hidden border-gray-300"
              >
                <img src={url} className="w-full h-32 object-cover" />
              </button>
            ))}
          </div>

          <input type="file" accept="image/*" onChange={handleUpload} />

          {preview && (
            <img
              src={preview}
              className="mt-4 w-40 h-40 object-cover rounded"
            />
          )}
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-sm font-semibold mb-2">Trạng thái</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value={PostStatus.DRAFT}>Nháp</option>
            <option value={PostStatus.PUBLISHED}>Đăng ngay</option>
          </select>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={handleBack}
            className="px-8 py-3 border rounded-full"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-3 px-8 py-3 bg-[#355C7D] text-white rounded-full"
            disabled={savePostMutation.isPending}
          >
            <Save size={18} />
            {isEditMode ? "Cập nhật" : "Tạo bài đăng"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostFormPage;
