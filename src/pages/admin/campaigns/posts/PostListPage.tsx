import React, { JSX, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
} from "lucide-react";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import { PostResource } from "@/types/post.type";
import { PostStatus } from "@/enum/status.enum";

import {
  addAdminPostFormRoute,
  editAdminPostFormRoute,
} from "@/routes/admin";
import {
  usePostsByCampaignId,
  useDeletePost,
} from "@/hooks/post.hook";

interface PostsListPageProps {
  campaignId: string;
}

const PostsListPage: React.FC<PostsListPageProps> = ({ campaignId }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<"ALL" | PostStatus>("ALL");

  /* ================= API ================= */
  const { data: posts = [], isLoading } =
    usePostsByCampaignId(campaignId);

  const deletePostMutation = useDeletePost(campaignId);

  /* ================= FILTER ================= */
  const filteredPosts = useMemo(() => {
    return posts.filter(
      (p) =>
        (p.title ?? "").toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === "ALL" || p.status === filterStatus)
    );
  }, [posts, search, filterStatus]);

  /* ================= ACTIONS ================= */
  const handleAdd = () =>
    navigate({
      to: addAdminPostFormRoute.to,
      params: { id: campaignId },
    });

  const handleEdit = (pid: string) =>
    navigate({
      to: editAdminPostFormRoute.to,
      params: { id: campaignId, postId: pid },
    });

  const handleView = (pid: string) =>
    navigate({
      to: editAdminPostFormRoute.to,
      params: { id: campaignId, postId: pid },
    });

  const handleDelete = (pid: string) => {
    if (confirm("Xác nhận xóa bài đăng này?")) {
      deletePostMutation.mutate(pid);
    }
  };

  /* ================= UI HELPERS ================= */
  const getStatusBadge = (status: PostStatus) => {
    const map: Record<PostStatus, JSX.Element> = {
        [PostStatus.PUBLISHED]: (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                Đã đăng
            </span>
        ),

        [PostStatus.DRAFT]: (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                Nháp
            </span>
        ),
    };
    return map[status];
  };

  /* ================= COLUMNS ================= */
  const columns: Column<PostResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "title",
      title: "Tiêu đề",
      render: (p) => (
        <div className="font-medium text-[#355C7D]">
          {p.title}
        </div>
      ),
    },

    {
      key: "content",
      title: "Nội dung",
      render: (p) => (
        <span className="text-gray-700 line-clamp-2">
          {p.content_md}
        </span>
      ),
    },

    {
      key: "image",
      title: "Ảnh",
      render: (p) =>
        p.cover_url? (
          <img
            src={p.cover_url}
            alt="Post"
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <span className="text-gray-500">Không có</span>
        ),
    },

    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (p) => p.status ? getStatusBadge(p.status) : <span className="text-gray-500">N/A</span>,
    },

    {
      key: "publishedAt",
      title: "Ngày đăng",
      render: (p) =>
        p.published_at
          ? new Date(p.published_at).toLocaleString("vi-VN")
          : "Chưa đăng",
    },

    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (p) => (
        <div className="flex justify-center gap-3 text-gray-500">
          <button onClick={() => handleView(p.id)}>
            <Eye size={18} />
          </button>
          <button onClick={() => handleEdit(p.id)}>
            <Edit size={18} />
          </button>
          <button
            className="hover:text-red-500"
            onClick={() => handleDelete(p.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  /* ================= RENDER ================= */
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          Quản lý bài đăng
        </h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm"
        >
          <PlusCircle size={18} /> Thêm bài đăng
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center flex-1 bg-white rounded-full px-4 py-2 border">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm bài đăng..."
            className="flex-1 outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as any)
            }
            className="border rounded-full px-3 py-2 text-sm"
          >
            <option value="ALL">Tất cả</option>
            <option value={PostStatus.PUBLISHED}>Đã đăng</option>
            <option value={PostStatus.DRAFT}>Nháp</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <TableComponent
        columns={columns}
        data={filteredPosts}
        loading={isLoading}
      />
    </div>
  );
};

export default PostsListPage;
