// src/types/post.type.ts
import { DataResponse, PaginationResponse } from "./base_response.type";

// Trạng thái bài đăng
export enum PostStatus {
  DRAFT = "DRAFT",         // Nháp
  PUBLISHED = "PUBLISHED", // Đã đăng
  SCHEDULED = "SCHEDULED", // Lên lịch
  ARCHIVED = "ARCHIVED",   // Lưu trữ
}

// Bài đăng
export interface PostResource {
  id: string;
  campaignId: string;

  title: string;
  content: string;
  image?: string;          // URL ảnh (từ media hoặc upload mới)

  status: PostStatus;
  scheduledAt?: string;    // Thời gian lên lịch (nếu có)
  publishedAt?: string;    // Thời gian đăng
  createdAt: string;
  updatedAt?: string;

  views?: number;          // Số lượt xem (tùy chọn)
  likes?: number;          // Số like
}

// Request tạo/sửa bài đăng
export interface CreatePostRequest {
  campaignId: string;
  title: string;
  content: string;
  image?: string;          // Có thể chọn từ media hoặc upload
  status: PostStatus;
  scheduledAt?: string;
}

// Response
export interface PostResponse extends DataResponse<PostResource[]> {}
export interface CreatePostResponse extends DataResponse<PostResource> {}