import { ParticipantResource, RegistrationStatus, ParticipantRole } from "@/types/participant.type";

export const demoParticipants: ParticipantResource[] = [
  {
    id: "v1",
    campaignId: "c1",
    fullName: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    phone: "0901234567",
    avatar: "",
    role: ParticipantRole.COORDINATOR,
    joinedAt: "2025-08-01T10:00:00Z",
    totalSessions: 5,
    approvedSessions: 5,
    attendedSessions: 4,
    points: 280,

    registrations: [
      {
        sessionId: "s1",
        sessionTitle: "Buổi sáng 15/09/2025",
        sessionDate: "2025-09-15T08:00",
        status: RegistrationStatus.APPROVED,
        appliedAt: "2025-08-10T09:00:00Z",
        reviewedAt: "2025-08-11T14:30:00Z",
        reviewedBy: "admin1",
        attended: true,
      },
      {
        sessionId: "s2",
        sessionTitle: "Buổi chiều 16/09/2025",
        sessionDate: "2025-09-16T13:30",
        status: RegistrationStatus.APPROVED,
        appliedAt: "2025-08-15T11:20:00Z",
        attended: true,
      },
    ],

    attendanceHistory: [
      {
        sessionId: "s1",
        sessionTitle: "Buổi sáng 15/09/2025",
        checkInAt: "2025-09-15T07:55:00Z",
        status: "present",
      },
      {
        sessionId: "s2",
        sessionTitle: "Buổi chiều 16/09/2025",
        checkInAt: "2025-09-16T13:25:00Z",
        status: "late",
        note: "Đi muộn 5 phút do kẹt xe",
      },
    ],

    adminNote: "Rất tích cực, có kinh nghiệm tổ chức",
  },
  {
    id: "v2",
    campaignId: "c1",
    fullName: "Trần Thị Bình",
    email: "binh.tran@example.com",
    phone: "0912345678",
    avatar: "",
    role: ParticipantRole.VOLUNTEER,
    joinedAt: "2025-08-05T14:20:00Z",
    totalSessions: 3,
    approvedSessions: 2,
    attendedSessions: 1,
    points: 90,

    registrations: [
      {
        sessionId: "s1",
        sessionTitle: "Buổi sáng 15/09/2025",
        sessionDate: "2025-09-15T08:00",
        status: RegistrationStatus.APPROVED,
        appliedAt: "2025-08-20T10:00:00Z",
        attended: true,
      },
      {
        sessionId: "s2",
        sessionTitle: "Buổi chiều 16/09/2025",
        sessionDate: "2025-09-16T13:30",
        status: RegistrationStatus.PENDING,
        appliedAt: "2025-09-01T08:15:00Z",
      },
      {
        sessionId: "s3",
        sessionTitle: "Buổi tối 20/09/2025",
        sessionDate: "2025-09-20T18:00",
        status: RegistrationStatus.REJECTED,
        appliedAt: "2025-09-05T12:00:00Z",
        reviewedAt: "2025-09-06T09:00:00Z",
        rejectedReason: "Đã đủ chỉ tiêu tình nguyện viên",
      },
    ],

    attendanceHistory: [
      {
        sessionId: "s1",
        sessionTitle: "Buổi sáng 15/09/2025",
        checkInAt: "2025-09-15T08:05:00Z",
        status: "present",
      },
    ],

    adminNote: "Mới tham gia, cần theo dõi thêm",
  },
  {
    id: "v3",
    campaignId: "c1",
    fullName: "Lê Văn Cường",
    email: "cuong.le@example.com",
    phone: "0923456789",
    avatar: "",
    role: ParticipantRole.VOLUNTEER,
    joinedAt: "2025-08-10T09:30:00Z",
    totalSessions: 2,
    approvedSessions: 2,
    attendedSessions: 0,
    points: 40,

    registrations: [
      {
        sessionId: "s1",
        sessionTitle: "Buổi sáng 15/09/2025",
        sessionDate: "2025-09-15T08:00",
        status: RegistrationStatus.APPROVED,
        appliedAt: "2025-08-25T15:00:00Z",
        attended: false,
      },
      {
        sessionId: "s2",
        sessionTitle: "Buổi chiều 16/09/2025",
        sessionDate: "2025-09-16T13:30",
        status: RegistrationStatus.APPROVED,
        appliedAt: "2025-09-02T10:00:00Z",
        attended: false,
      },
    ],

    attendanceHistory: [],

    adminNote: "Đã duyệt nhưng chưa tham gia buổi nào - cần nhắc nhở",
  },
];