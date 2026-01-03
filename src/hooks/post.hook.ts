import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { mediaService } from "@/services/media.service";
import { PostResource } from "@/types/post.type";
import { PostStatus } from "@/enum/status.enum";

/* ================= GET LIST BY CAMPAIGN ================= */
export const usePostsByCampaignId = (campaignId?: string) => {
  return useQuery<PostResource[]>({
    queryKey: ["posts-by-campaign", campaignId],
    enabled: !!campaignId,
    queryFn: () =>
      postService.getPostsByCampaignId(campaignId as string),
  });
};

/* ================= GET BY ID ================= */
export const usePostById = (postId?: string) => {
  return useQuery<PostResource>({
    queryKey: ["post-detail", postId],
    enabled: !!postId,
    queryFn: () => postService.getPostById(postId as string),
  });
};

/* ================= CREATE OR UPDATE (WITH MEDIA) ================= */
export const useSavePost = (
  campaignId: string,
  uploaderId: string
) => {
  const qc = useQueryClient();

  return useMutation<
    PostResource,
    Error,
    {
      id?: string;
      title: string;
      contentMd: string;
      status: PostStatus;
      coverFile?: File;
      coverUrl?: string;
    }
  >({
    mutationKey: ["save-post", campaignId],

   mutationFn: async (payload) => {
  let finalCoverUrl = payload.coverUrl;

  if (payload.coverFile) {
    const uploadRes = await mediaService.uploadMultipleMedia(
      campaignId,
      uploaderId,
      [payload.coverFile]
    );

    console.log("UPLOAD MEDIA RESPONSE:", uploadRes);

    // 🔥 DÒNG QUYẾT ĐỊNH
    finalCoverUrl = uploadRes?.data?.[0]?.url;

    if (!finalCoverUrl) {
      throw new Error("Upload media failed: no URL returned");
    }
  }

  return postService.savePost({
    id: payload.id,
    campaignId,
    title: payload.title,
    contentMd: payload.contentMd,
    coverUrl: finalCoverUrl,
    status: payload.status,
  });
},

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["posts-by-campaign", campaignId],
      });
    },
  });
};


/* ================= DELETE ================= */
export const useDeletePost = (campaignId: string) => {
  const qc = useQueryClient();

  return useMutation<void, Error, string>({
    mutationKey: ["delete-post"],
    mutationFn: (postId) => postService.deletePost(postId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["posts-by-campaign", campaignId],
      });
    },
  });
};
