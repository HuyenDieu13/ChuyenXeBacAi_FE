import httpClient from "@/config/AxiosConfig";
import { PostResource } from "@/types/post.type";
import { API_ROUTES } from "@/config/ApiConfig";

export const postService = {
  getPostsByCampaignId: async (campaignId: string) => {
    const res = await httpClient.get<PostResource[]>(
      API_ROUTES.posts.getPostsByCampaignId(campaignId)
    );
    return res.data;
  },

  getPostById: async (postId: string) => {
    const res = await httpClient.get<PostResource>(
      API_ROUTES.posts.getPostById(postId)
    );
    return res.data;
  },

  // CREATE + UPDATE
  savePost: async (data: {
    id?: string;
    campaignId: string;
    title: string;
    contentMd: string;
    coverUrl?: string;
    status: string;
  }) => {
    const res = await httpClient.post<PostResource>(
      API_ROUTES.posts.createPost, // /api/Content/posts
      data
    );
    return res.data;
  },
    deletePost: async (postId: string) => {
    await httpClient.delete<void>(
      API_ROUTES.posts.deletePost(postId)
    );
  },
};

