// src/data/demoPosts.ts
import { PostResource, PostStatus } from "@/types/post.type";

export const demoPosts: PostResource[] = [
  {
    id: "p1",
    campaignId: "c1",
    title: "Cập nhật tiến độ chiến dịch Trung Thu Ấm Áp",
    content: "Chúng tôi đã nhận được 20 triệu đồng quyên góp từ cộng đồng. Cảm ơn mọi người!",
    image: "https://images.unsplash.com/photo-1593113598332-cd288f2f31b4?w=1200",
    status: PostStatus.PUBLISHED,
    publishedAt: "2025-09-10T14:30:00Z",
    createdAt: "2025-09-10T10:00:00Z",
    views: 150,
    likes: 45,
  },
  {
    id: "p2",
    campaignId: "c1",
    title: "Lịch hoạt động tuần này",
    content: "Buổi từ thiện ngày 15/09 tại trường THCS Mường Lát. Mời mọi người tham gia!",
    image: "https://images.unsplash.com/photo-1605812830455-2f818b7be3c2?w=1200",
    status: PostStatus.SCHEDULED,
    scheduledAt: "2025-09-14T08:00:00Z",
    createdAt: "2025-09-12T15:00:00Z",
  },
  {
    id: "p3",
    campaignId: "c1",
    title: "Câu chuyện từ tình nguyện viên",
    content: "Chia sẻ từ anh An: 'Đây là trải nghiệm tuyệt vời!'",
    status: PostStatus.DRAFT,
    createdAt: "2025-09-11T11:00:00Z",
  },
];