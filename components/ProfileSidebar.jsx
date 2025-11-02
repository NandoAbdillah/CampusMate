import { useDarkMode } from "@/utils/DarkModeProvider";
import {
  Building2,
  Calendar,
  ChevronRight,
  GraduationCap,
  MapPin,
  Moon,
  Sun,
  ToggleLeft,
  ToggleRight,
  Users,
  X,
} from "lucide-react";
import React from "react";

const ProfileSidebar = ({ sidebarOpen, setSidebarOpen }) => {
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

  const { isDarkMode, toggleDarkMode } =  useDarkMode();

  return (
    <div
      className={`fixed  top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 border-r border-gray-200 ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
      
      <div className="bg-slate-100 border-b border-slate-200 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-800 text-sm">Kelas G</h1>
              <p className="text-xs text-gray-600">Teknik Informatika 2025</p>
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

     
      <nav className="p-3 sm:p-4">
        {/* <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
              className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-all duration-200 text-sm 
                
                  
              `}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight
                className={`w-3 h-3 transition-transform duration-200 `}
              />
            </button>
          ))}
        </div> */}
      </nav>

      <div className="p-3 sm:p-4 ">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Appearance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                {isDarkMode ? (
                  <Moon className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="text-yellow-500" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch to dark theme
                  </p>
                </div>
              </div>
              <button onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <ToggleRight size={24} className="text-indigo-600" />
                ) : (
                  <ToggleLeft size={24} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default ProfileSidebar;
