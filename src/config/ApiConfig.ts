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
        getAudits: (params: {
            entityType: string;
            entityId: string;
        }) =>
            buildQuery('/audits', params),
    },
    auth: {
        login: `${baseURL}/Auth/login`,
        register: `${baseURL}/Auth/register`,
        updateStatus: (id: string) => `${baseURL}/Auth/${id}/status`,
        sendOtp: `${baseURL}/Auth/forgot-password/send-otp`,
        resetPassword: `${baseURL}/Auth/forgot-password/reset`,
        verifyEmail: `${baseURL}/Auth/verify-email`,
        refreshToken: `${baseURL}/Auth/refresh-token`,
    },
    campaigns: {
        getCampaigns: (params: {
            // status?: string;
            q?: string;
            // page?: number;
            // pageSize?: number;
            // searchText?: string
        }) =>
            buildQuery('/Campaigns', params),
        getCampaignById: (id: string) => `${baseURL}/Campaigns/${id}`,
        createCampaign: `${baseURL}/Campaigns`,
        updateCampaign: (id: string) => `${baseURL}/Campaigns/${id}`,
        deleteCampaign: (id: string) => `${baseURL}/Campaigns/${id}`,
        getCampaignFullAssets: (id: string) => `${baseURL}/Campaigns/${id}/full-assets`,
        getCampaignDetailById: (id: string) => `${baseURL}/Campaigns/${id}/public-detail`,
        getCampaignPublic: `${baseURL}/Campaigns/public`,
    },
    sessions: {
        getSessionsByCampaignId: (campaignId: string) => `${baseURL}/Sessions/by-campaign/${campaignId}`,
        createSession: `${baseURL}/Sessions`,
        registerForSession: `${baseURL}/Sessions/registrations`,
        reviewRegistration: (id: string) => `${baseURL}/Sessions/registrations/${id}/review`,
    },
    checkin: {
        createCheckIn: `${baseURL}/Checkins`,
        createCheckInMedia: `${baseURL}/Checkins/media`,
    },
    media: {
        getMediaByCampaignId: (campaignId: string) => `${baseURL}/Media/campaign/${campaignId}`,
        getMediaByPostId: (postId: string) => `${baseURL}/Media/post/${postId}`,
        getMediaByCheckInId: (checkInId: string) => `${baseURL}/Media/checkin/${checkInId}`,
        createMedia: `${baseURL}/Media`,
        getMediaById: (mediaId: string) => `${baseURL}/Media/${mediaId}`,
        deleteMedia: (mediaId: string) => `${baseURL}/Media/${mediaId}`,
        createMediaLink: `${baseURL}/Media/link`,
        updateMediaLink: (mediaId: string) => `${baseURL}/Media/link/${mediaId}`,
        deleteMediaLink: (mediaId: string) => `${baseURL}/Media/link/${mediaId}`,
    },
    content: {
        getContentByCampaignId: (campaignId: string) => `${baseURL}/Content/posts/by-campaign/${campaignId}`,
        createContent: `${baseURL}/Content/posts`,
        getContentLatest: `${baseURL}/Content/posts/latest`,
        getContentFaqs: `${baseURL}/Content/faqs`,
        createContentFaq: `${baseURL}/Content/faqs`,
        getContentSubscribe: `${baseURL}/Content/subscribe`,
    },
    dashboard: {
        getDashboardCompaignProgress: `${baseURL}/Dashboard/campaign-progress`,
        getDashboardSessionRoster: `${baseURL}/Dashboard/session-roster`,
        getDashboardReconcileSummary: `${baseURL}/Dashboard/reconcile-summary`,
    },
    finance: {
        getFinanceExpensesByCampaignId: (campaignId: string) => `${baseURL}/Finance/expenses/by-campaign/${campaignId}`,
        createFinanceExpense: `${baseURL}/Finance/expenses`,
        getFinanceDonationsByCampaignId: (campaignId: string) => `${baseURL}/Finance/donations/by-campaign/${campaignId}`,
        createFinanceDonation: (campaignId: string) => `${baseURL}/Finance/donations/${campaignId}`,
        getFinanceFundsByCampaignId: (campaignId: string) => `${baseURL}/Finance/funds/by-campaign/${campaignId}`,
        createFinanceFund: `${baseURL}/Finance/funds`,
    },
    identity: {
        getIdentityUsers: (params: {
            page?: number;
            pageSize?: number;
            q?: string;
        }) =>
            buildQuery('/Identity/users', params),
        createIdentityUser: `${baseURL}/Identity/users`,
        getIdentityRoles: `${baseURL}/Identity/roles`,
        assignIdentityRoles: `${baseURL}/Identity/users/roles/assign`,
    },
    reconcile: {
        getReconcileSummary: (params: {
            campaignId?: string;
        }) =>
            buildQuery('/Reconcile/summary', params),
        createReconcileMatches: (fundTxId: string, bankStmtId: string) => `${baseURL}/Reconcile/matches/${fundTxId}/${bankStmtId}/decide`,
    },
    users: {
        getUsers: (params: {
            page?: number;
            pageSize?: number;
            q?: string;
        }) =>
            buildQuery('/Users', params),
        createUser: `${baseURL}/Users`,
        getUserById: (id: string) => `${baseURL}/Users/${id}`,
        updateUser: (id: string) => `${baseURL}/Users/${id}`,
        deleteUser: (id: string) => `${baseURL}/Users/${id}`,
        assignRole: (id: string) => `${baseURL}/Users/${id}/roles`,
    },
    volunteerApplications: {
        getVolunteers: (params: {
            page?: number;
            pageSize?: number;
            q?: string;
            status?: string;
        }) =>
            buildQuery('/volunteers/applications', params),
        createVolunteer: `${baseURL}/volunteers/applications`,
        getVolunteerById: (id: string) => `${baseURL}/volunteers/applications/${id}`,
        uddateVolunteer: (id: string) => `${baseURL}/volunteers/applications/${id}`,
        deleteVolunteer: (id: string) => `${baseURL}/volunteers/applications/${id}`,
        createVolunteerReview: (id: string) => `${baseURL}/volunteers/applications/${id}/review`,
    },
    volunteerRegistrations: {
        getRegistrations: (params: {
            page?: number;
            pageSize?: number;
            campaignId?: string;
            sessionId?: string;
            status?: string;
        }) =>
            buildQuery('/volunteers/registrations', params),
        getRegistrationById: (id: string) => `${baseURL}/volunteers/registrations/${id}`,
        deleteRegistration: (id: string) => `${baseURL}/volunteers/registrations/${id}`,
        applyRegistration: `${baseURL}/volunteers/registrations/apply`,
        publicApplyRegistration: `${baseURL}/volunteers/registrations/public-apply`,
        reveiwRegistration: (id: string) => `${baseURL}/volunteers/registrations/${id}/review`,
    },

};