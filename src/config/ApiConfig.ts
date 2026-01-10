import FundChart from "@/components/FundChart";
import { subscribe } from "diagnostics_channel";
import { get } from "http";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const buildQuery = (endpoint: string, params: Record<string, any>) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  return `${baseURL}${endpoint}?${query.toString()}`;
};
export const API_ROUTES = {
  audit: {
    getAudits: (params: { entityType: string; entityId: string }) =>
      buildQuery("/audits", params),
  },
  auth: {
    login: `${baseURL}/Auth/login`,
    register: `${baseURL}/Auth/register`,
    updateStatus: (id: string) => `${baseURL}/Auth/${id}/status`,
    sendOtp: `${baseURL}/Auth/forgot-password/send-otp`,
    resetPassword: (id: string) => `${baseURL}/Auth/${id}/reset-password`,
    verifyEmail: `${baseURL}/Auth/verify-email`,
    refreshToken: `${baseURL}/Auth/refresh-token`,
    getMe: `${baseURL}/Auth/me`,
  },
  campaigns: {
    getCampaigns: (params: {
      // status?: string;
      q?: string;
      // page?: number;
      // pageSize?: number;
      // searchText?: string
    }) => buildQuery("/Campaigns", params),
    getCampaignById: (id: string) => `${baseURL}/Campaigns/${id}`,
    createCampaign: `${baseURL}/Campaigns`,
    updateCampaign: (id: string) => `${baseURL}/Campaigns/${id}`,
    deleteCampaign: (id: string) => `${baseURL}/Campaigns/${id}`,
    getCampaignFullAssets: (id: string) =>
      `${baseURL}/Campaigns/${id}/full-assets`,
    getCampaignDetailById: (id: string) =>
      `${baseURL}/Campaigns/${id}/public-detail`,
    getCampaignPublic: `${baseURL}/Campaigns/public`,
    getCampaignOngoing: `${baseURL}/Campaigns/public-ongoing`,
  },
  sessions: {
    // LIST
    getSessionsByCampaignId: (campaignId: string) =>
      `${baseURL}/Sessions/by-campaign/${campaignId}`,
    getSessionById: (id: string) => `${baseURL}/Sessions/${id}`,
    // CREATE
    createSession: `${baseURL}/Sessions`,

    // UPDATE
    updateSession: (id: string) => `${baseURL}/Sessions/${id}`,
    updateStatusSession: (id: string) => `${baseURL}/Sessions/${id}/status`,
    getOrCodeSession: (id: string) => `${baseURL}/Sessions/${id}/qr-code`,
  },

  checkin: {
    createCheckIn: `${baseURL}/Checkins`,
    getCheckinBySession: (sessionId: string) => `${baseURL}/Checkins/session/${sessionId}`,
  },
  media: {
    getMediaByCampaignId: (campaignId: string) =>
      `${baseURL}/Media/campaign/${campaignId}`,
    getMediaByPostId: (postId: string) => `${baseURL}/Media/post/${postId}`,
    getMediaByCheckInId: (checkInId: string) =>
      `${baseURL}/Media/checkin/${checkInId}`,
    createMedia: `${baseURL}/Media`,
    getMediaById: (mediaId: string) => `${baseURL}/Media/${mediaId}`,
    deleteMedia: (mediaId: string) => `${baseURL}/Media/${mediaId}`,
    createMediaLink: `${baseURL}/Media/link`,
    updateMediaLink: (mediaId: string) => `${baseURL}/Media/link/${mediaId}`,
    deleteMediaLink: (mediaId: string) => `${baseURL}/Media/link/${mediaId}`,
    uploadMultipleMedia: `${baseURL}/Media/upload-multiple`,
    getMedialatest: (count: number) => `${baseURL}/Media/latest?count=${count}`,
  },
  content: {
    getContentByCampaignId: (campaignId: string) =>
      `${baseURL}/Content/posts/by-campaign/${campaignId}`,
    createContent: `${baseURL}/Content/posts`,
    getContentLatest: `${baseURL}/Content/posts/latest`,
    getContentFaqs: `${baseURL}/Content/faqs`,
    createContentFaq: `${baseURL}/Content/faqs`,
    subscribeContent: `${baseURL}/Content/subscribe`,
  },
  dashboard: {
    getDashboardCompaignProgress: `${baseURL}/Dashboard/campaign-progress`,
    getDashboardSessionRoster: `${baseURL}/Dashboard/session-roster`,
    getDashboardReconcileSummary: `${baseURL}/Dashboard/reconcile-summary`,
  },
  finance: {
    createFinanceManualIncome: (campaignId: string) =>
      `${baseURL}/Finance/manual-income?campaignId=${campaignId}`,
    createFinanceExpense: (campaignId: string) =>
      `${baseURL}/Finance/expenses?campaignId=${campaignId}`,
    getFinanceByCampaignId: (campaignId: string) =>
      `${baseURL}/Finance/campaign-progress/${campaignId}`,
    maintainFinance: (campaignId: string) =>
      `${baseURL}/Finance/transactions?campaignId=${campaignId}`,
    getDashboardAnomalies: `${baseURL}/Finance/manual-income'`,
    getTransactions: (campaignId: string) =>
      `${baseURL}/Finance/transactions/by-campaign/${campaignId}`,
    syncTimo: `${baseURL}/Finance/sync-timo`,
    exportFinanceExcel: (campaignId: string) =>
    `${baseURL}/Finance/export-excel/${campaignId}`,
    recalculateBalance: (campaignId: string) =>
    `${baseURL}/Finance/recalculate-balance/${campaignId}`,
    importTimoStatement: `${baseURL}/Finance/import-timo-statement`,
    financialHealth: `${baseURL}/Finance/financial-health`,
    fundStats: `${baseURL}/Finance/fund-stats`,
    fundChart: `${baseURL}/Finance/fund-chart`,


  },
  identity: {
    getIdentityUsers: (params: {
      page?: number;
      pageSize?: number;
      q?: string;
    }) => buildQuery("/Identity/users", params),
    createIdentityUser: `${baseURL}/Identity/users`,
    getIdentityRoles: `${baseURL}/Identity/roles`,
    assignIdentityRoles: `${baseURL}/Identity/users/roles/assign`,
  },
  reconcile: {
    getReconcileSummary: (params: { campaignId?: string }) =>
      buildQuery("/Reconcile/summary", params),
    createReconcileMatches: (fundTxId: string, bankStmtId: string) =>
      `${baseURL}/Reconcile/matches/${fundTxId}/${bankStmtId}/decide`,
  },
  users: {
    getUsers: (params: { page?: number; pageSize?: number; q?: string }) =>
      buildQuery("/Users", params),
    createUser: `${baseURL}/Users`,
    getUserById: (id: string) => `${baseURL}/Users/${id}`,

    updateUser: (id: string) => `${baseURL}/Users/${id}`,
    deleteUser: (id: string) => `${baseURL}/Users/${id}`,
    assignRole: (id: string) => `${baseURL}/Users/${id}/roles`,
  },
  posts: {
    getPostsByCampaignId: (campaignId: string) =>
      `${baseURL}/Content/posts/by-campaign/${campaignId}`,

    getPostById: (postId: string) =>
      `${baseURL}/Content/posts/${postId}`,

    createPost: `${baseURL}/Content/posts`, // 👈 dùng cho cả create + update

    deletePost: (postId: string) =>
      `${baseURL}/Content/posts/${postId}`,
  },


  volunteerApplications: {
    getVolunteers: (params: {
      page?: number;
      pageSize?: number;
      q?: string;
      status?: string;
    }) => buildQuery("/volunteers/applications", params),
    createVolunteer: `${baseURL}/volunteers/applications`,
    getVolunteerById: (id: string) =>
      `${baseURL}/volunteers/applications/${id}`,
    uddateVolunteer: (id: string) => `${baseURL}/volunteers/applications/${id}`,
    deleteVolunteer: (id: string) => `${baseURL}/volunteers/applications/${id}`,
    createVolunteerReview: (id: string) =>
      `${baseURL}/volunteers/applications/${id}/review`,
  },
  volunteerRegistrations: {
    // LIST
    getRegistrations: (params: {
      page?: number;
      pageSize?: number;
      campaignId?: string;
      sessionId?: string;
      status?: string;
    }) => buildQuery("/volunteers/registrations", params),

    // DETAIL
    getRegistrationById: (id: string) =>
      `${baseURL}/volunteers/registrations/${id}`,

    // DELETE
    deleteRegistration: (id: string) =>
      `${baseURL}/volunteers/registrations/${id}`,

    // APPLY
    applyRegistration: `${baseURL}/volunteers/registrations/apply`,
    publicApplyRegistration: `${baseURL}/volunteers/registrations/public-apply`,

    // REVIEW (ADMIN)
    reviewRegistration: (id: string) =>
      `${baseURL}/volunteers/registrations/${id}/review`,
    checkStatus: (params: {
      sessionId: string;
      userId: string
    }) => `${baseURL}/volunteers/registrations/check-status?sessionId=${params.sessionId}&userId=${params.userId}`,
    getDetailRegistration: (params: {
      sessionId: string;
      userId: string
    }) =>
      `${baseURL}/volunteers/registrations/detail?sessionId=${params.sessionId}&userId=${params.userId}`,
  },
  api: {
    volunteerRegistrations: {
      apply: "/api/volunteers/registrations/apply",

      volunteerRegistrations: {
        /* =========================
         * LIST
         * ========================= */
        getRegistrations: (params: {
          page?: number;
          pageSize?: number;
          campaignId?: string;
          sessionId?: string;
          status?: string;
        }) => buildQuery("/volunteers/registrations", params),

        /* =========================
         * DETAIL
         * ========================= */
        getRegistrationById: (id: string) =>
          `${baseURL}/volunteers/registrations/${id}`,

        /* =========================
         * APPLY
         * ========================= */
        applyRegistration: `${baseURL}/volunteers/registrations/apply`,
        publicApplyRegistration: `${baseURL}/volunteers/registrations/public-apply`,

        /* =========================
         * REVIEW (ADMIN)
         * ========================= */
        reviewRegistration: (id: string) =>
          `${baseURL}/volunteers/registrations/${id}/review`,

        /* =========================
         * DELETE
         * ========================= */
        deleteRegistration: (id: string) =>
          `${baseURL}/volunteers/registrations/${id}`,

      },

    },
  },
};
