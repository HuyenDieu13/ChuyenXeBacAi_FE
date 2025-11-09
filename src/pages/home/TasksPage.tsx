import React, { useState, useEffect } from "react";
import {
  ClipboardCheck,
  Clock,
  CheckCircle2,
  Search,
  Upload,
} from "lucide-react";
import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";

interface Task {
  id: string;
  title: string;
  campaign: string;
  session: string;
  date: string;
  status: "PLANNED" | "ONGOING" | "SUBMITTED" | "APPROVED";
  note?: string;
  photoUrl?: string;
}

const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Chuẩn bị quà & phân loại",
    campaign: "Trung Thu Ấm Áp",
    session: "Buổi sáng 06/11/2025",
    date: "2025-11-06",
    status: "ONGOING",
    note: "Phân loại quà theo nhóm tuổi",
  },
  {
    id: "t2",
    title: "Phát quà & hướng dẫn trò chơi",
    campaign: "Trung Thu Ấm Áp",
    session: "Buổi sáng 06/11/2025",
    date: "2025-11-06",
    status: "SUBMITTED",
    note: "Đã gửi minh chứng, chờ duyệt",
    photoUrl: "https://placehold.co/400x250?text=Ảnh+đã+gửi",
  },
];

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<"ALL" | Task["status"]>("ALL");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = tasks.filter(
    (t) =>
      (filter === "ALL" || t.status === filter) &&
      t.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmitTask = () => {
    if (!photoPreview) {
      alert("Vui lòng tải lên ảnh minh chứng!");
      return;
    }
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask?.id
          ? {
              ...t,
              status: "SUBMITTED",
              note: note || "Đã gửi minh chứng, chờ duyệt",
              photoUrl: photoPreview,
            }
          : t
      )
    );
    setSelectedTask(null);
    setPhotoPreview(null);
    setNote("");
  };

  const statusLabel = {
    PLANNED: "Chưa bắt đầu",
    ONGOING: "Đang thực hiện",
    SUBMITTED: "Chờ duyệt",
    APPROVED: "Đã duyệt",
  };

  const statusColor = (s: Task["status"]) => {
    switch (s) {
      case "PLANNED":
        return "bg-gray-100 text-gray-600";
      case "ONGOING":
        return "bg-yellow-100 text-yellow-700";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-700";
      case "APPROVED":
        return "bg-green-100 text-green-700";
    }
  };

  const dataBanner = {
    title: "Nhiệm vụ của tôi",
    content:
      "Theo dõi, thực hiện và gửi minh chứng cho các nhiệm vụ bạn được giao trong những chiến dịch thiện nguyện.",
    buttonText: "Xem chiến dịch",
  };

  return (
    <div className="w-full flex flex-col items-center overflow-hidden scroll-smooth bg-gradient-to-b from-yellow-50 to-white">
      {/* Banner */}
      <BannerCustomComponent
        title={dataBanner.title}
        content={dataBanner.content}
        buttonText={dataBanner.buttonText}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl w-full px-6 mt-6">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="text-yellow-600" />
          <BreadcrumbRibbon label="Nhiệm vụ thiện nguyện" />
        </div>
      </div>

      {/* Content — bố cục dọc */}
      <section className="w-full max-w-5xl flex flex-col gap-8 items-center text-center px-6 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-600">
          Danh sách nhiệm vụ
        </h2>
        <p className="text-gray-600 max-w-2xl leading-relaxed">
          Dưới đây là các nhiệm vụ bạn được giao trong chiến dịch. Hãy cập nhật
          tiến độ và gửi minh chứng sau khi hoàn thành nhé!
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {["ALL", "PLANNED", "ONGOING", "SUBMITTED", "APPROVED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === s
                  ? "bg-yellow-400 text-white border-yellow-400 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-yellow-50 border-gray-200"
              }`}
            >
              {s === "ALL"
                ? "Tất cả"
                : statusLabel[s as keyof typeof statusLabel]}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:w-80 mt-2">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm nhiệm vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
          />
        </div>

        {/* Task list */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {filtered.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-yellow-50 p-6 text-left"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Chiến dịch:{" "}
                    <span className="font-medium text-yellow-600">
                      {task.campaign}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {task.session} • {task.date}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                    task.status
                  )}`}
                >
                  {statusLabel[task.status]}
                </span>
              </div>

              {task.photoUrl && (
                <img
                  src={task.photoUrl}
                  alt="Proof"
                  className="w-full h-44 object-cover rounded-xl mt-4 border border-gray-100"
                />
              )}

              {task.note && (
                <p className="text-sm text-gray-500 mt-3 italic">
                  Ghi chú: {task.note}
                </p>
              )}

              <div className="mt-5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock size={16} />
                  <span>{task.date}</span>
                </div>

                {task.status === "ONGOING" && (
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full text-sm font-medium shadow-sm transition"
                  >
                    <ClipboardCheck size={16} />
                    Gửi minh chứng
                  </button>
                )}
                {task.status === "SUBMITTED" && (
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                    <Upload size={16} /> Đã gửi, chờ duyệt
                  </span>
                )}
                {task.status === "APPROVED" && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle2 size={16} /> Hoàn thành
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Upload Proof */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] sm:w-[440px] border border-yellow-100 relative">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4 text-center">
              Gửi Minh Chứng Hoàn Thành
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setPhotoPreview(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
              />

              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl mt-3 border border-gray-200"
                />
              )}

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú thêm..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none resize-none"
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmitTask}
                  className="px-5 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium shadow-sm"
                >
                  Gửi xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
