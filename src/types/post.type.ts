// src/types/post.type.ts
import { PostStatus } from "@/enum/status.enum";
import { DataResponse, PaginationResponse } from "./base_response.type";

// Bài đăng
export interface PostResource {
  id: string;
  campaignId?: string;

  title?: string;
  content_md: string;
  cover_url?: string;      // URL ảnh bìa
  status?: PostStatus;
  campaign?: null;         // Thông tin chiến dịch (nếu cần)
  post_media_assets?: any[]; // Danh sách media đính kèm (nếu cần)

  created_at?: string;
  scheduled_at?: string;
  published_at?: string;
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

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  image?: string;          // Có thể chọn từ media hoặc upload
  status?: PostStatus;
  scheduledAt?: string;
}

// Response
export interface PostResponse extends DataResponse<PostResource[]> {}
export interface CreatePostResponse extends DataResponse<PostResource> {}