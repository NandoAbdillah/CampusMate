import React, { useState, useEffect, useRef } from "react";
import {
  Crown,
  Star,
  DollarSign,
  FileText,
  BookOpen,
  Users,
  Menu,
  X,
  Calendar,
  MapPin,
  GraduationCap,
  ChevronRight,
  Building2,
} from "lucide-react";

const Students = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("struktur");
  const [animatedLines, setAnimatedLines] = useState(new Set());
  const lineRefs = useRef([]);

  // Intersection Observer untuk animasi line
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.dataset.lineId) {
            const lineId = entry.target.dataset.lineId;
            setAnimatedLines((prev) => new Set([...prev, lineId]));
          }
        });
      },
      { threshold: 0.3 }
    );

    lineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeView]);

 
  useEffect(() => {
    setAnimatedLines(new Set());
    lineRefs.current = [];
  }, [activeView]);

  // Data organisasi dengan warna soft
  const orgStructure = {
    ketua: {
      name: "Ahmad Rizki Pratama",
      position: "Ketua Kelas",
      icon: Crown,
      color: "bg-amber-100 border-amber-200 text-amber-800",
    },
    wakil: {
      name: "Sari Dewi Lestari",
      position: "Wakil Ketua Kelas",
      icon: Star,
      color: "bg-blue-100 border-blue-200 text-blue-800",
    },
    bendahara: [
      {
        name: "Budi Santoso",
        position: "Bendahara 1",
        icon: DollarSign,
        color: "bg-green-100 border-green-200 text-green-800",
      },
      {
        name: "Maya Putri Sari",
        position: "Bendahara 2",
        icon: DollarSign,
        color: "bg-green-50 border-green-200 text-green-700",
      },
    ],
    sekretaris: [
      {
        name: "Dani Pratama",
        position: "Sekretaris 1",
        icon: FileText,
        color: "bg-purple-100 border-purple-200 text-purple-800",
      },
      {
        name: "Linda Sari Dewi",
        position: "Sekretaris 2",
        icon: FileText,
        color: "bg-purple-50 border-purple-200 text-purple-700",
      },
    ],
  };

  const pjMatkul = [
    {
      name: "Reza Firmansyah",
      matkul: "Algoritma & Pemrograman",
      color: "bg-red-50 border-red-200 text-red-700",
    },
    {
      name: "Fitri Handayani",
      matkul: "Basis Data",
      color: "bg-orange-50 border-orange-200 text-orange-700",
    },
    {
      name: "Andi Wijaya",
      matkul: "Jaringan Komputer",
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
    },
    {
      name: "Novi Rahayu",
      matkul: "Sistem Operasi",
      color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
    {
      name: "Eko Susanto",
      matkul: "Rekayasa Perangkat Lunak",
      color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    },
    {
      name: "Rina Marlina",
      matkul: "Kecerdasan Buatan",
      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    },
    {
      name: "Hendra Gunawan",
      matkul: "Grafika Komputer",
      color: "bg-violet-50 border-violet-200 text-violet-700",
    },
  ];

  const mahasiswa = [
    "Agus Setiawan",
    "Ani Lestari",
    "Bayu Pratama",
    "Citra Dewi",
    "Dedy Kurniawan",
    "Eka Putri",
    "Fandi Rahman",
    "Gita Sari",
    "Hadi Wijaya",
    "Ira Handayani",
    "Joko Santoso",
    "Kiki Amelia",
    "Luki Permana",
    "Mega Wati",
    "Nando Putra",
    "Ovi Rahmawati",
    "Pandi Susilo",
    "Qori Maharani",
    "Rudi Hartono",
    "Sinta Dewi",
    "Toni Firmansyah",
    "Umi Kalsum",
    "Vino Saputra",
    "Wati Suryani",
    "Yanto Budiman",
    "Zara Amini",
    "Arif Budiono",
    "Bela Sari",
    "Candra Kirana",
    "Diana Putri",
    "Eris Gunawan",
    "Fira Handayani",
    "Gilang Ramadhan",
    "Hesti Pratiwi",
    "Ivan Setiawan",
    "Jihan Maharani",
  ].map((name, index) => ({
    nim: `2023${(index + 1).toString().padStart(3, "0")}`,
    name: name,
  }));

  const PersonCard = ({
    person,
    size = "normal",
    showNIM = false,
    onClick,
  }) => {
    const IconComponent = person.icon;
    const isLarge = size === "large";
    const isMedium = size === "medium";

    return (
      <div
        className={`group relative cursor-pointer select-none ${
          isLarge
            ? "w-48 sm:w-56 lg:w-60"
            : isMedium
            ? "w-40 sm:w-48 lg:w-52"
            : "w-32 sm:w-36 lg:w-44"
        }`}
        onClick={onClick}
      >
        <div
          className={`bg-white rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all duration-200 transform hover:-translate-y-1 active:scale-95 border-2 ${
            person.color.split(" ")[1]
          } overflow-hidden`}
        >
          {/* Header area */}
          <div
            className={`${person.color} ${
              isLarge
                ? "px-3 py-2 sm:px-4 sm:py-3"
                : isMedium
                ? "px-2 py-2 sm:px-3 sm:py-2"
                : "px-2 py-1.5 sm:px-3 sm:py-2"
            } relative`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2">
                {IconComponent && (
                  <IconComponent
                    className={`${
                      isLarge
                        ? "w-3 h-3 sm:w-4 sm:h-4"
                        : "w-2.5 h-2.5 sm:w-3 sm:h-3"
                    } opacity-70`}
                  />
                )}
                <span
                  className={`font-medium ${
                    isLarge ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"
                  } opacity-80 leading-tight`}
                >
                  {person.position || "Mahasiswa"}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`px-2 sm:px-3 lg:px-4 ${
              isLarge ? "py-3 sm:py-4" : "py-2 sm:py-3"
            } text-center`}
          >
            <div
              className={`${
                isLarge
                  ? "w-8 h-8 sm:w-10 sm:h-10"
                  : isMedium
                  ? "w-7 h-7 sm:w-8 sm:h-8"
                  : "w-6 h-6 sm:w-8 sm:h-8"
              } ${person.color.split(" ")[0]} ${
                person.color.split(" ")[1]
              } rounded-full mx-auto flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-200`}
            >
              <span
                className={`font-semibold ${
                  isLarge
                    ? "text-[10px] sm:text-xs"
                    : "text-[8px] sm:text-[10px]"
                } ${person.color.split(" ")[2]}`}
              >
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>

            <h3
              className={`font-semibold text-gray-700 mb-1 ${
                isLarge
                  ? "text-xs sm:text-sm"
                  : isMedium
                  ? "text-[10px] sm:text-xs"
                  : "text-[9px] sm:text-[10px] lg:text-xs"
              } leading-tight px-1`}
            >
              {person.name}
            </h3>

            {showNIM && person.nim && (
              <p
                className={`${
                  isLarge
                    ? "text-[10px] sm:text-xs"
                    : "text-[8px] sm:text-[10px]"
                } text-gray-500 bg-gray-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md inline-block mt-1`}
              >
                {person.nim}
              </p>
            )}
            {person.matkul && (
              <p
                className={`${
                  isLarge
                    ? "text-[10px] sm:text-xs"
                    : "text-[8px] sm:text-[10px]"
                } text-gray-600 mt-1 leading-tight px-1`}
              >
                {person.matkul}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Improved connection lines dengan animasi
  const ConnectionSVG = ({
    width = 400,
    height = 100,
    type = "simple",
    lineId = "default",
    className = "",
    animated = true,
  }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
      } else {
        setShow(true);
      }
    }, [animated]);

    // Get safe width for responsive design
    const getSafeWidth = () => {
      if (typeof window !== "undefined") {
        return Math.min(width, window.innerWidth - 40);
      }
      return width;
    };

    const safeWidth = getSafeWidth();

    if (type === "fork") {
      return (
        <div className={`flex justify-center ${className}`}>
          <svg width={safeWidth} height={height} className="mx-auto">
            <defs>
              <linearGradient
                id={`grad-${lineId}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Main vertical line */}
            <line
              x1={safeWidth / 2}
              y1="0"
              x2={safeWidth / 2}
              y2="30"
              stroke="#3b82f6"
              strokeWidth="3"
              opacity={show ? 1 : 0}
              style={{
                transition:
                  "opacity 600ms ease-in-out, stroke-width 600ms ease-in-out",
                strokeWidth: show ? "3" : "0",
                filter: show
                  ? "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))"
                  : "none",
              }}
            />

            {/* Horizontal line */}
            <line
              x1="80"
              y1="30"
              x2={safeWidth - 80}
              y2="30"
              stroke="#3b82f6"
              strokeWidth="3"
              opacity={show ? 1 : 0}
              style={{
                transition:
                  "opacity 800ms ease-in-out 300ms, stroke-width 800ms ease-in-out 300ms, transform 800ms ease-in-out 300ms",
                strokeWidth: show ? "3" : "0",
                transform: show ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "center",
                filter: show
                  ? "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))"
                  : "none",
              }}
            />

            {/* Left vertical */}
            <line
              x1="80"
              y1="30"
              x2="80"
              y2="60"
              stroke="#3b82f6"
              strokeWidth="3"
              opacity={show ? 1 : 0}
              style={{
                transition:
                  "opacity 600ms ease-in-out 600ms, transform 600ms ease-in-out 600ms",
                transform: show ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
                filter: show
                  ? "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))"
                  : "none",
              }}
            />

            {/* Right vertical */}
            <line
              x1={safeWidth - 80}
              y1="30"
              x2={safeWidth - 80}
              y2="60"
              stroke="#3b82f6"
              strokeWidth="3"
              opacity={show ? 1 : 0}
              style={{
                transition:
                  "opacity 600ms ease-in-out 600ms, transform 600ms ease-in-out 600ms",
                transform: show ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
                filter: show
                  ? "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))"
                  : "none",
              }}
            />

            {/* Connection dots */}
            <circle
              cx={safeWidth / 2}
              cy="30"
              r="4"
              fill="#3b82f6"
              opacity={show ? 0.9 : 0}
              style={{ transition: "opacity 400ms ease-in-out 600ms" }}
            />
            <circle
              cx="80"
              cy="30"
              r="4"
              fill="#3b82f6"
              opacity={show ? 0.9 : 0}
              style={{ transition: "opacity 400ms ease-in-out 800ms" }}
            />
            <circle
              cx={safeWidth - 80}
              cy="30"
              r="4"
              fill="#3b82f6"
              opacity={show ? 0.9 : 0}
              style={{ transition: "opacity 400ms ease-in-out 800ms" }}
            />
          </svg>
        </div>
      );
    }

    // Simple line type
    return (
      <div className={`flex justify-center ${className}`}>
        <svg width="6" height={height} className="mx-auto">
          <line
            x1="3"
            y1="0"
            x2="3"
            y2={height}
            stroke="#3b82f6"
            strokeWidth="4"
            opacity={show ? 1 : 0}
            style={{ transition: "opacity 800ms ease-in-out" }}
          />
        </svg>
      </div>
    );
  };

  const renderOrgChart = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                Struktur Organisasi Kelas G
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Sistem Informasi 2023 - Universitas XYZ
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-base sm:text-lg font-semibold text-gray-800">
                    6
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    Pengurus Inti
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-base sm:text-lg font-semibold text-gray-800">
                    7
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    PJ Mata Kuliah
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-base sm:text-lg font-semibold text-gray-800">
                    36
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    Total Mahasiswa
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-base sm:text-lg font-semibold text-gray-800">
                    49
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    Total Anggota
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organizational Chart */}
      <div className="relative bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 border border-gray-200 overflow-x-auto">
        <div className="min-w-[320px]  ">
          {/* Level 1: Ketua Kelas */}
          <div className="flex justify-center">
            <PersonCard person={orgStructure.ketua} size="large" />
          </div>

          {/* Connection Line 1 */}
          <ConnectionSVG height={50} lineId="line-1" />

          {/* Level 2: Wakil Ketua */}
          <div className="flex justify-center">
            <PersonCard person={orgStructure.wakil} size="medium" />
          </div>

          {/* Connection Lines to Bendahara & Sekretaris */}
          <ConnectionSVG width={800} height={60} type="fork" lineId="line-2" />

          {/* Level 3: Bendahara & Sekretaris */}
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full max-w-5xl gap-6 sm:gap-4">
              {/* Bendahara Section */}
              <div className=" space-y-3 sm:space-y-4 text-center">
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium inline-block">
                  BENDAHARA
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {orgStructure.bendahara.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>

              {/* Sekretaris Section */}
              <div className="space-y-3 sm:space-y-4 text-center">
                <div className="bg-purple-50 border border-purple-200 text-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium inline-block">
                  SEKRETARIS
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {orgStructure.sekretaris.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connection to PJ Matkul */}
          <div className="flex justify-center ">
            <div className="space-y-2 sm:space-y-3 text-center">
              <ConnectionSVG height={300} lineId="line-3" className=" absolute top-[10vh] translate-1/2 " />
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg text-xs sm:text-sm font-medium inline-block">
                PENANGGUNG JAWAB MATA KULIAH
              </div>
              <ConnectionSVG height={25} lineId="line-4" />
            </div>
          </div>

          {/* Level 4: PJ Mata Kuliah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {pjMatkul.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>

          {/* Connection to Students */}
          <div className="flex justify-center">
            <div className="space-y-2 sm:space-y-3 text-center">
              <ConnectionSVG height={25} lineId="line-5" />
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg text-xs sm:text-sm font-medium inline-block">
                MAHASISWA KELAS G
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMahasiswaGrid = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
              Daftar Mahasiswa Kelas G
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              36 Mahasiswa Sistem Informasi Angkatan 2023
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 border border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3">
          {mahasiswa.map((student, index) => (
            <PersonCard
              key={index}
              person={{
                ...student,
                color: "bg-slate-50 border-slate-200 text-slate-700",
              }}
              showNIM={true}
              onClick={() => {
                // Mobile haptic feedback simulation
                if (navigator.vibrate) {
                  navigator.vibrate(50);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const sidebarItems = [
    {
      id: "struktur",
      label: "Bagan Organisasi",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: "mahasiswa",
      label: "Daftar Mahasiswa",
      icon: <GraduationCap className="w-4 h-4" />,
    },
  ];

  return (
    <div className=" max-w-[90vw]  bg-gray-50  overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:hidden top-0 left-0 h-full w-64 sm:w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 border-r border-gray-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-sm`}
      >
        {/* Sidebar Header */}
        <div className="bg-slate-100 border-b border-slate-200 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800 text-sm">Kelas G</h1>
                <p className="text-xs text-gray-600">Sistem Informasi 2023</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 hover:bg-slate-200 rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-all duration-200 text-sm ${
                  activeView === item.id
                    ? "bg-blue-50 border border-blue-200 text-blue-700 shadow-sm"
                    : "hover:bg-gray-50 text-gray-700 active:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight
                  className={`w-3 h-3 transition-transform duration-200 ${
                    activeView === item.id
                      ? "rotate-90 text-blue-600"
                      : "text-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center text-xs text-gray-500 space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Senin, 21 September 2025</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Universitas XYZ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" ">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-manipulation"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h1 className="font-semibold text-gray-800 text-sm">Kelas G</h1>
              <p className="text-xs text-gray-500">Sistem Informasi</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 ">
          {activeView === "struktur" ? renderOrgChart() : renderMahasiswaGrid()}
        </div>
      </div>
    </div>
  );
};

export default Students;
