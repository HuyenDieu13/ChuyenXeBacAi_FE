// src/pages/admin/media/SessionMediaPage.tsx
import React, { useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import toast from "react-hot-toast";

import { MediaAssetResource } from "@/types/media.type";
import {
  useUploadMultipleMedia,
  useGetMediaByCampaignId,
} from "@/hooks/media.hooks";

interface SessionMediaPageProps {
  campaignId: string;
}

const HARD_CODE_UPLOADER_ID = "10000000-0000-0000-0000-000000000001";

const SessionMediaPage: React.FC<SessionMediaPageProps> = ({ campaignId }) => {
  /* ================= STATE ================= */
  const [files, setFiles] = useState<File[]>([]);

  /* ================= API ================= */
  const uploadMutation = useUploadMultipleMedia(
    campaignId,
    HARD_CODE_UPLOADER_ID
  );

  const {
    data: mediaResponse,
    isLoading,
    refetch,
  } = useGetMediaByCampaignId(campaignId);

  // ✅ LUÔN ÉP VỀ ARRAY
  const mediaList: MediaAssetResource[] = Array.isArray(mediaResponse?.data)
    ? mediaResponse.data
    : [];

  /* ================= HANDLERS ================= */

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = () => {
    if (!files.length) {
      toast.error("Vui lòng chọn ít nhất 1 ảnh");
      return;
    }

    uploadMutation.mutate(files, {
      onSuccess: () => {
        toast.success("Upload ảnh thành công");
        setFiles([]);
        refetch(); // ✅ reload danh sách ảnh
      },
      onError: () => {
        toast.error("Upload ảnh thất bại");
      },
    });
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          Ảnh hoạt động của chiến dịch
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Upload và quản lý hình ảnh theo chiến dịch
        </p>
      </div>

      {/* UPLOAD BOX */}
      <div className="bg-white rounded-2xl border p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Upload className="text-[#355C7D]" />
          <span className="font-medium">
            Chọn ảnh để upload (có thể chọn nhiều)
          </span>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleSelectFiles}
        />

        {/* PREVIEW FILES */}
        {files.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-lg overflow-hidden border"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          disabled={uploadMutation.isPending}
          onClick={handleUpload}
          className="bg-[#355C7D] text-white px-4 py-2 rounded-full text-sm disabled:opacity-60"
        >
          {uploadMutation.isPending ? "Đang upload..." : "Upload ảnh"}
        </button>
      </div>

      {/* MEDIA GRID */}
      <div className="bg-white rounded-2xl border p-5">
        <h2 className="font-semibold text-[#355C7D] mb-4 flex items-center gap-2">
          <ImageIcon size={18} />
          Danh sách ảnh
        </h2>

        {isLoading ? (
          <p className="text-sm text-gray-500">Đang tải ảnh...</p>
        ) : mediaList.length === 0 ? (
          <p className="text-sm text-gray-500">
            Chưa có ảnh nào cho chiến dịch này
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaList.map((media) => (
              <div key={media.id} className="rounded-xl overflow-hidden border">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={media.url} // ✅ field backend
                    alt={media.public_id}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionMediaPage;
