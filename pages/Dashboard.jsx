import React, { useState } from "react";
import {
  Monitor,
  Video,
  Briefcase,
  Star,
  User,
  Info,
  Image,
  Calendar,
  Home,
  Newspaper,
  Megaphone,
  ArrowUpDown,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import animationData from "../public/animations/student.json";
import LottieAnimation from "@/components/LottieAnimation";
import { useAuth } from "@/utils/AuthContext";
import { DateUtils } from "@/lib/dateConfig";
import AnnouncementCard from "@/components/AnnouncementCard";
import AnnouncementSystem from "@/components/AnnouncementCard";
import AddAnnouncementDialog from "@/components/AddAnnouncementDialog";

const ActivityChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Hours",
        data: [2.5, 3.2, 2.8, 4.1, 3.8, 4.5],
        backgroundColor: [
          "#E8B4FF",
          "#FFB4B4",
          "#B4E8FF",
          "#FFE8B4",
          "#B4FFB4",
          "#FFB4E8",
        ],
        borderRadius: 8,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Activity</span>
        <span className="text-xs text-gray-500">Week</span>
      </div>
      <div className="text-2xl font-bold mb-4">3.5h</div>
      <div className="h-24 mb-3">
        <Bar data={data} options={options} />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs text-gray-600">Great result!</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { user } = useAuth();

  const categories = [
    { name: "Semua", icon: Home },
    { name: "Info Penting", icon: Info },
    { name: "Berita ", icon: Newspaper },
    { name: "Info Lain", icon: Megaphone },
  ];

  

  // const [sortNewest, setSortNewest] = useState(true);

  // const sortedAnnouncements = [...announcements].sort((a, b) => {
  //   const dateA = new Date(a.date);
  //   const dateB = new Date(b.date);
  //   return sortNewest ? dateB - dateA : dateA - dateB;
  // });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Dashboard
            </h1>
            <span className="text-xs text-gray-500 mt-1 block">
              <Calendar className="w-3 h-3 inline-block mr-1" />{" "}
              {DateUtils.formatIndonesian(new Date())}
            </span>
          </div>

          <div className="relative w-full border border-slate-50 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-6 md:p-8 flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center space-x-4 md:space-x-6 flex-1 z-10">
                <div className="text-white flex-1">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-1">
                    Halo, {user.name}
                  </h2>
                  <p className="text-sm md:text-base text-blue-100 opacity-90">
                    Selamat {DateUtils.getTimeCategory()} !
                  </p>
                </div>
              </div>

              {/* Decorative arrow/icon on the right */}
              {/* <div className="flex-shrink-0 ml-4 z-10">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-white transform rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14m-7-7l7 7-7 7"
                    />
                  </svg>
                </div>
              </div> */}
            </div>

            {/* Lottie Animation dengan ukuran responsif */}
            <div className="absolute top-[-2.5rem]  right-0 md:top-[-5.5rem] pointer-events-none">
              <LottieAnimation
                animationData={animationData}
                style={{
                  className:
                    "w-32 h-32  md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56",
                }}
                loop={true}
                autoplay={true}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`
              flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors
              ${
                activeCategory === category.name
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }
            `}
              >
                <category.icon size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>


          <AddAnnouncementDialog/>
         
          {/* Card Anouncement */}

          <AnnouncementSystem />

          {/* Featured Announcements */}
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Featured announcements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* <AnnouncementCard
              title="Flutter Masterclass (Dart, APIs, Firebase & More)"
              category="IT & Software"
              rating={4.8}
              students="3,520"
              bgColor="bg-pink-200"
              icon={Monitor}
            />
            <AnnouncementCard
              title="Advanced Business Strategy"
              category="Business"
              rating={4.9}
              students="2,341"
              bgColor="bg-yellow-200"
              icon={Briefcase}
            /> */}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4">
          <div className="space-y-6">
            {/* Activity Chart */}
            <ActivityChart />

            {/* My Announcements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900">
                  My announcements
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </button>
              </div>
              
              {/* <AnnouncementCard
                title="Flutter Masterclass (Dart, APIs, Firebase & More)"
                category="IT & Software"
                rating={4.8}
                students="3,520"
                bgColor="bg-rose-200"
                icon={Monitor}
              /> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
