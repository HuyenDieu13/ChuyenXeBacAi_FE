// src/pages/admin/campaigns/posts/PostsListPage.tsx
import React, { useState } from "react";
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
import { demoPosts } from "./postData";
import { PostResource, PostStatus } from "@/types/post.type";
import { addAdminPostFormRoute, editAdminPostFormRoute } from "@/routes/admin";

interface PostsListPageProps {
    campaignId: string;
}

const PostsListPage: React.FC<PostsListPageProps> = ({ campaignId }) => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState<PostResource[]>(
        demoPosts.filter((p) => p.campaignId === campaignId)
    );
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<"ALL" | PostStatus>("ALL");

    const filteredPosts = posts.filter(p =>
        (p.title.toLowerCase().includes(search.toLowerCase())) &&
        (filterStatus === "ALL" || p.status === filterStatus)
    );

    const handleAdd = () =>
        navigate({ to: addAdminPostFormRoute.to, params: { id: campaignId } });

    const handleEdit = (pid: string) =>
        navigate({ to: editAdminPostFormRoute.to, params: { id: campaignId, postId: pid } });

    const handleView = (pid: string) =>
        navigate({ to: editAdminPostFormRoute.to, params: { id: campaignId, postId: pid } });

    const handleDelete = (pid: string) => {
        if (confirm("Xác nhận xóa bài đăng này?")) {
            setPosts(posts.filter((p) => p.id !== pid));
        }
    };

    const getStatusBadge = (status: PostStatus) => {
        switch (status) {
            case PostStatus.PUBLISHED:
                return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Đã đăng</span>;
            case PostStatus.SCHEDULED:
                return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Lên lịch</span>;
            case PostStatus.DRAFT:
                return <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Nháp</span>;
            case PostStatus.ARCHIVED:
                return <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Lưu trữ</span>;
        }
    };

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
                <span className="text-gray-700 line-clamp-2">{p.content}</span>
            ),
        },

        {
            key: "image",
            title: "Ảnh",
            render: (p) => p.image ? (
                <img src={p.image} alt="Post image" className="w-12 h-12 object-cover rounded" />
            ) : (
                <span className="text-gray-500">Không có</span>
            ),
        },

        {
            key: "status",
            title: "Trạng thái",
            align: "center",
            render: (p) => getStatusBadge(p.status),
        },

        {
            key: "publishedAt",
            title: "Ngày đăng",
            render: (p) => p.publishedAt ? new Date(p.publishedAt).toLocaleString("vi-VN") : "Chưa đăng",
        },

        {
            key: "actions",
            title: "Thao tác",
            align: "center",
            render: (p) => (
                <div className="flex justify-center gap-3 text-gray-500">
                    <button className="hover:text-[#355C7D]" title="Xem chi tiết" onClick={() => handleView(p.id)}>
                        <Eye size={18} />
                    </button>
                    <button className="hover:text-yellow-600" title="Chỉnh sửa" onClick={() => handleEdit(p.id)}>
                        <Edit size={18} />
                    </button>
                    <button className="hover:text-red-500" title="Xóa" onClick={() => handleDelete(p.id)}>
                        <Trash2 size={18} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-[#355C7D]">Quản lý bài đăng</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
                >
                    <PlusCircle size={18} /> Thêm bài đăng
                </button>
            </div>
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm bài đăng..." className="flex-1 outline-none text-sm text-gray-700" />
                </div>

                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-500" />
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none hover:border-[#355C7D]">
                        <option value="ALL">Tất cả</option>
                        <option value={PostStatus.PUBLISHED}>Đã đăng</option>
                        <option value={PostStatus.SCHEDULED}>Lên lịch</option>
                        <option value={PostStatus.DRAFT}>Nháp</option>
                        <option value={PostStatus.ARCHIVED}>Lưu trữ</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <TableComponent columns={columns} data={filteredPosts} />
        </div>
    );
};

export default PostsListPage;