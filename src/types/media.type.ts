/* ======================================================
 * MEDIA – UPLOAD MULTIPLE FILES
 * ====================================================== */
export interface MediaAssetResource {
  id: string;

  campaign_id: string;
  uploader_id: string;
  checkin_id?: string | null;

  url: string;          // ✅ URL ảnh Cloudinary
  public_id: string;

  thumb_url?: string | null;
  format: string;

  uploaded_at: string;
}


/* ================= QUERY PARAMS ================= */

export interface UploadMultipleMediaQuery {
    id: string;
  /** ID chiến dịch (UUID) */
  campaignId?: string;

  /** ID người upload (UUID – FK tới users/admins) */
  uploaderId?: string;
}

/* ================= FORM DATA ================= */

/**
 * multipart/form-data
 * key: files
 */
export interface UploadMultipleMediaForm {
  files: File[];
}

/* ================= REQUEST ================= */

export interface UploadMultipleMediaRequest {
  query: UploadMultipleMediaQuery;
  formData: UploadMultipleMediaForm;
}

/* ================= MEDIA RESOURCE ================= */

export interface MediaAssetResource {
  id: string;

  campaignId: string;
  uploaderId: string;

  fileName: string;
  fileUrl: string;

  fileSize: number;
  mimeType: string;

  createdAt: string; // ISO date
}

/* ================= RESPONSE ================= */

export interface UploadMultipleMediaResponse {
  assets: any;
  success: boolean;
  message?: string;
  data: MediaAssetResource[];
}

export interface MediaResource {
    id: string;
    url: string;
    thumb_url?: string;
    compaign_id?: string;
    uploaded_at?: string;
}
export type MediaLatestResponse = MediaResource[];