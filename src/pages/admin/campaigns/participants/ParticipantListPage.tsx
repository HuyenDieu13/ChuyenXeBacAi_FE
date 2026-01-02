// src/pages/admin/participants/ParticipantsListPage.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Clock,
  Search,
} from "lucide-react";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import { addAdminParticipantFormRoute } from "@/routes/admin";
import { VolunteerRegistrationResource } from "@/types/volunteer-registration.type";
import { VolunteerRegistrationStatus } from "@/enum/status.enum";
import {
  useVolunteerRegistrations,
  useReviewVolunteerRegistration,
} from "@/hooks/volunteer-application.hook";

interface ParticipantsListPageProps {
  campaignId: string;
}

const ParticipantsListPage: React.FC<ParticipantsListPageProps> = ({
  campaignId,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  /* ================= API ================= */
  const { data, isLoading } = useVolunteerRegistrations({ campaignId });
  const reviewMutation = useReviewVolunteerRegistration();

  const registrations = Array.isArray(data?.data) ? data.data : [];

  /* ================= FILTER ================= */
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r: VolunteerRegistrationResource) =>
      r.user?.fullName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [registrations, search]);

  /* ================= GROUP BY SESSION ================= */
  const groupedBySession = useMemo(() => {
    const map = new Map<string, VolunteerRegistrationResource[]>();

    filteredRegistrations.forEach((r: VolunteerRegistrationResource) => {
      const key = r.session_id || "unknown";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    });

    return Array.from(map.entries()).map(([sessionId, items]) => ({
      sessionId,
      session: items[0]?.session,
      registrations: items,
    }));
  }, [filteredRegistrations]);

  /* ================= HANDLERS ================= */
  const handleAdd = () => {
    navigate({ to: addAdminParticipantFormRoute.to });
  };

  const handleApprove = (id: string) => {
    reviewMutation.mutate({
      id,
      data: {
        status: VolunteerRegistrationStatus.APPROVED,
      },
    });
  };

  const handleReject = (id: string) => {
    const reason = prompt("Lý do từ chối?");
    if (!reason) return;

    reviewMutation.mutate({
      id,
      data: {
        status: VolunteerRegistrationStatus.REJECTED,
        rejectReason: reason,
      },
    });
  };

  const getSessionInfo = (r: VolunteerRegistrationResource) => {
    const raw = r as any;

    return {
      name:
        raw.session_title ||
        raw.sessionName ||
        r.session?.title ||
        "Phiên tình nguyện",

      place:
        raw.place_name ||
        raw.placeName ||
        r.session?.placeName ||
        "Chưa cập nhật địa điểm",

      date: raw.session_date || raw.sessionDate || r.session?.sessionDate || "",
    };
  };

  /* ================= TABLE ================= */
  const columns: Column<VolunteerRegistrationResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "fullName",
      title: "Họ tên",
      render: (r) => (
        <div className="font-medium text-[#355C7D]">{r.user?.fullName}</div>
      ),
    },

    {
      key: "email",
      title: "Email",
      render: (r) => r.user?.email,
    },

    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (r) => {
        switch (r.status) {
          case VolunteerRegistrationStatus.PENDING:
            return (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                Chờ duyệt
              </span>
            );
          case VolunteerRegistrationStatus.APPROVED:
            return (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                Đã duyệt
              </span>
            );
          default:
            return (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                Từ chối
              </span>
            );
        }
      },
    },

    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (r) => (
        <div className="flex justify-center gap-3">
          {r.status === VolunteerRegistrationStatus.PENDING && (
            <>
              <button
                onClick={() => handleApprove(r.id)}
                className="hover:text-green-600"
              >
                <UserCheck size={18} />
              </button>

              <button
                onClick={() => handleReject(r.id)}
                className="hover:text-red-600"
              >
                <UserX size={18} />
              </button>
            </>
          )}

          <button className="hover:text-blue-600">
            <Edit size={18} />
          </button>

          <button className="hover:text-purple-600">
            <Clock size={18} />
          </button>

          <button className="hover:text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  /* ================= RENDER ================= */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold text-[#355C7D]">
            Thành viên tham gia
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Tổng: {registrations.length} người • Chờ duyệt:{" "}
            {
              registrations.filter(
                (r: { status: VolunteerRegistrationStatus }) =>
                  r.status === VolunteerRegistrationStatus.PENDING
              ).length
            }
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] text-white px-4 py-2 rounded-full text-sm"
        >
          <PlusCircle size={18} /> Thêm thành viên
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 border">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm thành viên..."
          className="flex-1 outline-none text-sm"
        />
      </div>

      {/* SESSION LIST */}
      {groupedBySession.map((group) => (
        <div
          key={group.sessionId}
          className="bg-white rounded-2xl border p-5 space-y-4"
        >
          {/* SESSION HEADER */}
          <div className="flex justify-between items-center">
            <div>
              {(() => {
                const info = getSessionInfo(group.registrations[0]);

                return (
                  <>
                    <h2 className="text-lg font-semibold text-[#355C7D]">
                      {info.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-0.5">
                      {info.date && <span>📅 {info.date}</span>}
                      {" • "}
                      <span>📍 {info.place}</span>
                    </p>
                  </>
                );
              })()}
            </div>

            <div className="text-sm text-gray-600">
              Tổng: {group.registrations.length} • Chờ duyệt:{" "}
              {
                group.registrations.filter(
                  (r) => r.status === VolunteerRegistrationStatus.PENDING
                ).length
              }
            </div>
          </div>

          <TableComponent
            columns={columns}
            data={group.registrations}
            loading={isLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default ParticipantsListPage;
