import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  User,
  Phone,
  Clock,
  CheckCircle2,
  Plus,
  BookOpen,
  GraduationCap,
  Coffee,
  Gift,
  X,
  Save,
  Trash2,
} from "lucide-react";

const Schedule = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Event categories untuk keperluan kuliah
  const eventCategories = {
    assignment: {
      name: "Tugas",
      color: "from-red-400 to-red-500",
      icon: "📝",
      textColor: "text-red-700",
      bgColor: "bg-red-100",
    },
    exam: {
      name: "Ujian",
      color: "from-purple-400 to-purple-500",
      icon: "📚",
      textColor: "text-purple-700",
      bgColor: "bg-purple-100",
    },
    presentation: {
      name: "Presentasi",
      color: "from-blue-400 to-blue-500",
      icon: "🎤",
      textColor: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    class: {
      name: "Kelas",
      color: "from-green-400 to-green-500",
      icon: "🏫",
      textColor: "text-green-700",
      bgColor: "bg-green-100",
    },
    study: {
      name: "Belajar Grup",
      color: "from-yellow-400 to-yellow-500",
      icon: "👥",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-100",
    },
    social: {
      name: "Acara Sosial",
      color: "from-pink-400 to-pink-500",
      icon: "🎉",
      textColor: "text-pink-700",
      bgColor: "bg-pink-100",
    },
    birthday: {
      name: "Ulang Tahun",
      color: "from-indigo-400 to-indigo-500",
      icon: "🎂",
      textColor: "text-indigo-700",
      bgColor: "bg-indigo-100",
    },
    meeting: {
      name: "Rapat",
      color: "from-gray-400 to-gray-500",
      icon: "👔",
      textColor: "text-gray-700",
      bgColor: "bg-gray-100",
    },
  };

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tugas Algoritma",
      date: new Date(2025, 8, 22),
      startTime: "23:59",
      endTime: "23:59",
      category: "assignment",
      description: "Deadline pengumpulan tugas algoritma sorting",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "UTS Database",
      date: new Date(2025, 8, 25),
      startTime: "08:00",
      endTime: "10:00",
      category: "exam",
      description: "Ujian Tengah Semester mata kuliah Database",
      priority: "high",
      completed: false,
    },
    {
      id: 3,
      title: "Presentasi Project Web",
      date: new Date(2025, 8, 19),
      startTime: "13:00",
      endTime: "15:00",
      category: "presentation",
      description: "Presentasi final project web development",
      priority: "medium",
      completed: false,
    },
    {
      id: 4,
      title: "Kelas Data Mining",
      date: new Date(2025, 8, 23),
      startTime: "09:00",
      endTime: "11:00",
      category: "class",
      description: "Kuliah reguler Data Mining dengan Dr. Sari",
      priority: "medium",
      completed: false,
    },
    {
      id: 5,
      title: "Study Group ML",
      date: new Date(2025, 8, 21),
      startTime: "14:00",
      endTime: "16:00",
      category: "study",
      description: "Belajar bersama Machine Learning untuk persiapan UAS",
      priority: "medium",
      completed: false,
    },
    {
      id: 6,
      title: "HUT Andi",
      date: new Date(2025, 8, 28),
      startTime: "19:00",
      endTime: "22:00",
      category: "birthday",
      description: "Ulang tahun Andi - teman sekelas",
      priority: "low",
      completed: false,
    },
    {
      id: 7,
      title: "Study Group ML",
      date: new Date(2025, 8, 21),
      startTime: "14:00",
      endTime: "16:00",
      category: "study",
      description: "Belajar bersama Machine Learning untuk persiapan UAS",
      priority: "medium",
      completed: false,
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    category: "assignment",
    description: "",
    priority: "medium",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const weekDaysShort = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    return isSameDay(checkDate, today);
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getRelativeTime = (eventDate) => {
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      if (diffDays === 1) return "Besok";
      if (diffDays <= 7) return `${diffDays} hari lagi`;
      if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} minggu lagi`;
      return `${Math.ceil(diffDays / 30)} bulan lagi`;
    } else if (diffDays === 0) {
      return "Hari ini";
    } else {
      const absDays = Math.abs(diffDays);
      if (absDays === 1) return "Kemarin";
      if (absDays <= 7) return `${absDays} hari lalu`;
      if (absDays <= 30) return `${Math.ceil(absDays / 7)} minggu lalu`;
      return `${Math.ceil(absDays / 30)} bulan lalu`;
    }
  };

  const currentMonthEvents = useMemo(() => {
    return events
      .filter(
        (event) =>
          event.date.getMonth() === currentDate.getMonth() &&
          event.date.getFullYear() === currentDate.getFullYear()
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [currentDate, events]);

  const selectedDateEvents = currentMonthEvents.filter(
    (event) => event.date.getDate() === selectedDate
  );

  const getEventsForDay = (day) => {
    return currentMonthEvents.filter((event) => event.date.getDate() === day);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime) return;

    const eventDate = new Date(newEvent.date);
    const event = {
      id: Date.now(),
      title: newEvent.title,
      date: eventDate,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime || newEvent.startTime,
      category: newEvent.category,
      description: newEvent.description,
      priority: newEvent.priority,
      completed: false,
    };

    setEvents((prev) => [...prev, event]);
    setNewEvent({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      category: "assignment",
      description: "",
      priority: "medium",
    });
    setShowAddEvent(false);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date.toISOString().split("T")[0],
      startTime: event.startTime,
      endTime: event.endTime,
      category: event.category,
      description: event.description,
      priority: event.priority,
    });
    setShowAddEvent(true);
  };

  const handleUpdateEvent = () => {
    if (
      !editingEvent ||
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.startTime
    )
      return;

    const eventDate = new Date(newEvent.date);
    const updatedEvent = {
      ...editingEvent,
      title: newEvent.title,
      date: eventDate,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime || newEvent.startTime,
      category: newEvent.category,
      description: newEvent.description,
      priority: newEvent.priority,
    };

    setEvents((prev) =>
      prev.map((e) => (e.id === editingEvent.id ? updatedEvent : e))
    );
    setNewEvent({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      category: "assignment",
      description: "",
      priority: "medium",
    });
    setEditingEvent(null);
    setShowAddEvent(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const toggleEventComplete = (eventId) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, completed: !e.completed } : e
      )
    );
  };

  const getEventStatus = (eventDate, completed) => {
    if (completed) return "completed";
    const now = new Date();
    const eventEndDate = new Date(eventDate);
    eventEndDate.setHours(23, 59, 59);

    if (eventEndDate < now) {
      return "overdue";
    } else if (isSameDay(eventDate, now)) {
      return "today";
    } else {
      return "upcoming";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500";
      case "medium":
        return "border-l-4 border-yellow-500";
      case "low":
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-gray-500";
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 lg:h-32"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isSelected = day === selectedDate;
      const isTodayDate = isToday(day);

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`
            h-24 lg:h-32 p-2 border border-gray-200 cursor-pointer transition-all duration-200
            hover:bg-blue-50 hover:shadow-md relative overflow-hidden rounded-3xl
            ${
              isSelected
                ? "bg-blue-100 ring-2 ring-blue-500"
                : isTodayDate
                ? "bg-yellow-50 ring-1 ring-yellow-300"
                : "bg-white hover:bg-gray-50"
            }
          `}
        >
          <div
            className={`
            text-sm font-medium mb-1
            ${
              isSelected
                ? "text-blue-700"
                : isTodayDate
                ? "text-yellow-700"
                : "text-gray-900"
            }
          `}
          >
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event, index) => {
              const category = eventCategories[event.category];
              return (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded truncate ${
                    category.bgColor
                  } ${category.textColor}
                    ${event.completed ? "opacity-50 line-through" : ""}
                  `}
                  title={event.title}
                >
                  <span className="mr-1">{category.icon}</span>
                  {event.title}
                </div>
              );
            })}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 font-medium">
                +{dayEvents.length - 3} lainnya
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-3 rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <h1 className="text-2xl lg:text-3xl font-bold text-center">
                    Kalender Kuliah
                  </h1>

                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-3 rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="text-center mb-4">
                  <h2 className="text-xl lg:text-2xl font-semibold">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                </div>

                {/* Week days */}
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day, index) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium opacity-90 py-2"
                    >
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{weekDaysShort[index]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="space-y-6">
            {/* Add Event Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={() => {
                  setShowAddEvent(true);
                  setEditingEvent(null);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Tambah Acara Baru</span>
              </button>
            </div>

            {/* Today's Events */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white">
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {selectedDate === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear()
                    ? "Acara Hari Ini"
                    : `Acara ${selectedDate} ${months[currentDate.getMonth()]}`}
                </h3>
              </div>

              <div className="p-4 max-h-96 overflow-y-auto">
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => {
                      const category = eventCategories[event.category];
                      const status = getEventStatus(
                        event.date,
                        event.completed
                      );
                      const relativeTime = getRelativeTime(event.date);

                      return (
                        <div
                          key={event.id}
                          className={`p-4 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer group ${getPriorityColor(
                            event.priority
                          )} bg-gray-50 hover:bg-white`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-2xl">
                                  {category.icon}
                                </span>
                                <div>
                                  <h4
                                    className={`font-medium ${
                                      event.completed
                                        ? "line-through text-gray-500"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {event.title}
                                  </h4>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${category.bgColor} ${category.textColor} font-medium`}
                                  >
                                    {category.name}
                                  </span>
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 flex items-center space-x-1 mb-2">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {event.startTime} - {event.endTime}
                                </span>
                              </p>

                              {event.description && (
                                <p className="text-sm text-gray-500 mb-2">
                                  {event.description}
                                </p>
                              )}

                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full font-medium
                                  ${
                                    status === "upcoming"
                                      ? "bg-blue-100 text-blue-700"
                                      : status === "today"
                                      ? "bg-green-100 text-green-700"
                                      : status === "completed"
                                      ? "bg-gray-100 text-gray-600"
                                      : "bg-red-100 text-red-700"
                                  }
                                `}
                                >
                                  {relativeTime}
                                </span>

                                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleEventComplete(event.id);
                                    }}
                                    className={`p-1 rounded-full ${
                                      event.completed
                                        ? "text-green-600 hover:text-green-700"
                                        : "text-gray-400 hover:text-green-600"
                                    } transition-colors`}
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditEvent(event);
                                    }}
                                    className="p-1 rounded-full text-gray-400 hover:text-blue-600 transition-colors"
                                  >
                                    <User className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteEvent(event.id);
                                    }}
                                    className="p-1 rounded-full text-gray-400 hover:text-red-600 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Tidak ada acara pada tanggal ini</p>
                  </div>
                )}
              </div>
            </div>

            {/* Monthly Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ringkasan Bulan Ini
              </h3>
              <div className="space-y-2">
                {Object.entries(eventCategories).map(([key, category]) => {
                  const count = currentMonthEvents.filter(
                    (e) => e.category === key
                  ).length;
                  if (count === 0) return null;

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span className="text-sm text-gray-600">
                          {category.name}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${category.bgColor} ${category.textColor}`}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingEvent ? "Edit Acara" : "Tambah Acara Baru"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddEvent(false);
                    setEditingEvent(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Acara
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan judul acara..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(eventCategories).map(([key, category]) => (
                      <option key={key} value={key}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioritas
                    </label>
                    <select
                      value={newEvent.priority}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, priority: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Rendah</option>
                      <option value="medium">Sedang</option>
                      <option value="high">Tinggi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Waktu Mulai
                    </label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Waktu Selesai
                    </label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Deskripsi tambahan (opsional)..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAddEvent(false);
                      setEditingEvent(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingEvent ? "Update" : "Simpan"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
