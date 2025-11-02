import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Brain,
  Code,
  Calendar,
  Clock,
  User,
  Users,
  ChevronUp,
} from "lucide-react";

const Assignment = () => {
  const [currentDate] = useState(new Date()); // Real-time current date
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  // Calculate semester week
  const startDate = new Date(2025, 7, 26); // August 26, 2025
  const weeksDiff =
    Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;

  const mataKuliah = [
    {
      id: 1,
      nama: "Sistem Operasi",
      deskripsi:
        "Pelajari dasar sistem operasi, manajemen memori, proses, dan implementasinya",
      penanggungJawab: "Dr. Budi Santoso",
      dosenPengampu: "Prof. Sari Wijaya",
      icon: Monitor,
      color: "bg-blue-500",
    },
    {
      id: 2,
      nama: "Kecerdasan Buatan",
      deskripsi:
        "Kecerdasan yang ditunjukkan oleh mesin, tidak seperti kecerdasan alami yang ditunjukkan oleh manusia dan hewan",
      penanggungJawab: "Dr. Ahmad Rahman",
      dosenPengampu: "Dr. Lisa Indrawati",
      icon: Brain,
      color: "bg-purple-500",
    },
    {
      id: 3,
      nama: "Rekayasa Perangkat Lunak",
      deskripsi:
        "Pelajari rekayasa perangkat lunak untuk desain, pengembangan dan pemeliharaan aplikasi",
      penanggungJawab: "Prof. Andi Wijaya",
      dosenPengampu: "Dr. Maya Sari",
      icon: Code,
      color: "bg-pink-500",
    },
  ];

  const tugasDeadline = [
    {
      id: 1,
      nama: "Tugas UTS Sistem Operasi",
      mataKuliah: "Sistem Operasi",
      deadline: "2025-09-21",
      status: "urgent",
    },
    {
      id: 2,
      nama: "Project AI Chatbot",
      mataKuliah: "Kecerdasan Buatan",
      deadline: "2025-09-25",
      status: "soon",
    },
    {
      id: 3,
      nama: "Analisis Requirement",
      mataKuliah: "Rekayasa Perangkat Lunak",
      deadline: "2025-10-01",
      status: "normal",
    },
    {
      id: 4,
      nama: "Essay Algoritma",
      mataKuliah: "Sistem Operasi",
      deadline: "2025-09-18",
      status: "overdue",
    },
    {
      id: 5,
      nama: "Laporan Database",
      mataKuliah: "Sistem Operasi",
      deadline: "2025-09-22",
      status: "urgent",
    },
    {
      id: 6,
      nama: "Quiz Machine Learning",
      mataKuliah: "Kecerdasan Buatan",
      deadline: "2025-09-27",
      status: "soon",
    },
  ];

  // Get latest task for each subject and calculate urgency for sorting
  const getLatestTaskForSubject = (subjectName) => {
    const subjectTasks = tugasDeadline.filter(
      (task) => task.mataKuliah === subjectName
    );
    if (subjectTasks.length === 0) return null;

    // Sort by deadline (closest first)
    return subjectTasks.sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    )[0];
  };

  const getTaskUrgencyScore = (task) => {
    if (!task) return 999; // No task = lowest priority

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(task.deadline);
    deadline.setHours(0, 0, 0, 0);
    const daysDiff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return 100; // Overdue
    if (daysDiff <= 1) return 1; // Urgent (today/tomorrow)
    if (daysDiff <= 7) return 7; // Within a week
    if (daysDiff <= 14) return 14; // Within 2 weeks
    return 30; // Normal
  };

  const getTaskStatus = (task) => {
    if (!task)
      return { status: "none", color: "bg-gray-300", text: "Tidak ada tugas" };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(task.deadline);
    deadline.setHours(0, 0, 0, 0);
    const daysDiff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0)
      return { status: "overdue", color: "bg-gray-500", text: "Terlambat" };
    if (daysDiff <= 1)
      return { status: "urgent", color: "bg-red-500", text: "Urgent" };
    if (daysDiff <= 7)
      return { status: "soon", color: "bg-yellow-500", text: "1 Minggu" };
    if (daysDiff <= 14)
      return { status: "normal", color: "bg-green-500", text: "2 Minggu" };
    return { status: "future", color: "bg-blue-500", text: "Normal" };
  };

  // Sort subjects by task urgency (most urgent first)
  const sortedMataKuliah = [...mataKuliah].sort((a, b) => {
    const taskA = getLatestTaskForSubject(a.nama);
    const taskB = getLatestTaskForSubject(b.nama);
    return getTaskUrgencyScore(taskA) - getTaskUrgencyScore(taskB);
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const isThisWeek = (day) => {
    const today = new Date();
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    return dayDate >= startOfWeek && dayDate <= endOfWeek;
  };

  const getTaskHighlight = (day) => {
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dayDate.setHours(0, 0, 0, 0);

    // Check if any task has deadline on this day
    const tasksOnThisDay = tugasDeadline.filter((task) => {
      const taskDate = new Date(task.deadline);
      taskDate.setHours(0, 0, 0, 0);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      );
    });

    if (tasksOnThisDay.length === 0) return null;

    const daysDiff = Math.ceil((dayDate - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return "bg-gray-500"; // Overdue
    if (daysDiff <= 1) return "bg-red-500"; // Today or tomorrow
    if (daysDiff <= 7) return "bg-yellow-500"; // Within a week
    if (daysDiff <= 14) return "bg-green-500"; // Within 2 weeks
    return "bg-blue-400"; // More than 2 weeks
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day);
      const isWeekHighlight = isThisWeek(day) && !isCurrentDay;
      const taskHighlight = getTaskHighlight(day);

      let className =
        "h-8 w-8 flex items-center justify-center text-sm rounded-full cursor-pointer transition-all duration-200 relative ";

      if (isCurrentDay) {
        className +=
          "bg-blue-600 text-white font-bold ring-2 ring-blue-300 ring-offset-1";
      } else if (taskHighlight) {
        className += `${taskHighlight} text-white font-semibold shadow-sm`;
      } else if (isWeekHighlight) {
        className += "bg-blue-100 text-blue-800 font-medium";
      } else {
        className += "text-gray-600 hover:bg-gray-100";
      }

      days.push(
        <div key={day} className={className}>
          {day}
          {taskHighlight && !isCurrentDay && (
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full border border-gray-300 shadow-sm"></div>
          )}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">
            {currentDate.toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <div className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <ChevronRight className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>

        <div className="mb-3 text-center">
          <div className="text-sm text-blue-600 font-medium">
            Semester 1 - Minggu ke-{weeksDiff > 0 ? weeksDiff : 1}
          </div>
          <div className="flex justify-center gap-3 mt-2 text-xs flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Urgent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">1 Minggu</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">2 Minggu</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-gray-600">Lewat</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const renderTimelineTugas = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Timeline Tugas</h3>
          <span className="text-sm text-blue-600 cursor-pointer hover:underline">
            Lihat semua
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {tugasDeadline.map((tugas) => {
          const today = new Date();
          const deadline = new Date(tugas.deadline);
          const daysDiff = Math.ceil(
            (deadline - today) / (1000 * 60 * 60 * 24)
          );

          let statusColor = "bg-gray-400";
          let statusText = "Terlambat";

          if (daysDiff < 0) {
            statusColor = "bg-gray-500";
            statusText = "Terlambat";
          } else if (daysDiff <= 1) {
            statusColor = "bg-red-500";
            statusText = "Urgent";
          } else if (daysDiff <= 7) {
            statusColor = "bg-yellow-500";
            statusText = "1 Minggu";
          } else if (daysDiff <= 14) {
            statusColor = "bg-green-500";
            statusText = "2 Minggu";
          } else {
            statusColor = "bg-blue-500";
            statusText = "Normal";
          }

          return (
            <div
              key={tugas.id}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200"
            >
              <div
                className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${statusColor} shadow-sm`}
              ></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {tugas.nama}
                </h4>
                <p className="text-xs text-gray-500 mb-2">{tugas.mataKuliah}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {deadline.toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full text-white font-medium ${statusColor}`}
                  >
                    {statusText}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Mata Kuliah Saya
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <RefreshCw className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">
                Christine Eva
              </span>
            </div>
          </div>
        </div>

        {/* Filters - Desktop */}
        <div className="hidden sm:flex items-center gap-4 mb-6">
          <span className="text-sm text-gray-600">Filter by:</span>
          {["Time", "Level", "Language", "Type"].map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg shadow-sm cursor-pointer"
            >
              <span className="text-sm text-gray-700">{filter}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Mobile Calendar Toggle */}
        <div className="sm:hidden mb-4">
          <button
            onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
            className="w-full bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Kalender & Tugas</span>
            </div>
            {isCalendarExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Calendar & Tasks - Expanded */}
            {isCalendarExpanded && (
              <div className="sm:hidden mb-6 space-y-4">
                {renderCalendar()}
                {renderTimelineTugas()}
              </div>
            )}

            {/* Mata Kuliah Cards */}
            <div className="space-y-6">
              {sortedMataKuliah.map((mk) => {
                const IconComponent = mk.icon;
                const latestTask = getLatestTaskForSubject(mk.nama);
                const taskStatus = getTaskStatus(latestTask);

                return (
                  <div
                    key={mk.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Header dengan gradient */}
                    <div
                      className={`h-2 bg-gradient-to-r ${
                        mk.color === "bg-blue-500"
                          ? "from-blue-400 to-blue-600"
                          : mk.color === "bg-purple-500"
                          ? "from-purple-400 to-purple-600"
                          : "from-pink-400 to-pink-600"
                      }`}
                    ></div>

                    <div className="p-6 sm:p-8">
                      {/* Mobile Layout */}
                      <div className="flex flex-col sm:hidden space-y-4">
                        {/* Icon and Title */}
                        <div className="flex items-center gap-4">
                          <div
                            className={`${mk.color} p-3 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
                          >
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {mk.nama}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {mk.deskripsi}
                        </p>

                        {/* Staff and Task Info */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs text-gray-500 block">
                                Penanggung Jawab
                              </span>
                              <span className="font-semibold text-gray-800 text-sm">
                                {mk.penanggungJawab}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                              <Users className="h-4 w-4 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs text-gray-500 block">
                                Dosen Pengampu
                              </span>
                              <span className="font-semibold text-gray-800 text-sm">
                                {mk.dosenPengampu}
                              </span>
                            </div>
                          </div>
                          {latestTask && (
                            <div className="flex items-center gap-3">
                              <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                                <Clock className="h-4 w-4 text-orange-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs text-gray-500 block">
                                  Tugas Terbaru
                                </span>
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-gray-800 text-sm truncate pr-2">
                                    {latestTask.nama}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full text-white font-medium ${taskStatus.color} flex-shrink-0`}
                                  >
                                    {taskStatus.text}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(
                                    latestTask.deadline
                                  ).toLocaleDateString("id-ID")}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action button */}
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 w-full">
                          <span>Masuk Kelas</span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:flex items-start gap-6">
                        {/* Icon with improved styling */}
                        <div
                          className={`${mk.color} p-4 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
                        >
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                                {mk.nama}
                              </h3>
                              <p className="text-gray-600 text-base leading-relaxed mb-6">
                                {mk.deskripsi}
                              </p>
                            </div>
                          </div>

                          {/* Staff and Task Info dengan styling yang lebih baik */}
                          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-5 space-y-3 mb-6">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 p-2 rounded-lg">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <span className="text-sm text-gray-500 block">
                                  Penanggung Jawab
                                </span>
                                <span className="font-semibold text-gray-800">
                                  {mk.penanggungJawab}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="bg-purple-100 p-2 rounded-lg">
                                <Users className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <span className="text-sm text-gray-500 block">
                                  Dosen Pengampu
                                </span>
                                <span className="font-semibold text-gray-800">
                                  {mk.dosenPengampu}
                                </span>
                              </div>
                            </div>
                            {latestTask && (
                              <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-lg">
                                  <Clock className="h-4 w-4 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="text-sm text-gray-500 block">
                                    Tugas Terbaru
                                  </span>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <span className="font-semibold text-gray-800">
                                        {latestTask.nama}
                                      </span>
                                      <span className="text-sm text-gray-500 block">
                                        Deadline:{" "}
                                        {new Date(
                                          latestTask.deadline
                                        ).toLocaleDateString("id-ID")}
                                      </span>
                                    </div>
                                    <span
                                      className={`text-xs px-3 py-1 rounded-full text-white font-medium ${taskStatus.color}`}
                                    >
                                      {taskStatus.text}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action button */}
                          <div className="flex justify-end">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                              <span>Masuk Kelas</span>
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block space-y-6">
            {renderCalendar()}
            {renderTimelineTugas()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
