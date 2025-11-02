import React, { useState } from "react";
import {
  Menu,
  Bell,
  Settings,
  GraduationCap,
  Users,
  Monitor,
  Video,
  Briefcase,
  Brain,
  Star,
  User,
  BarChart3,
  BookOpen,
  Home,
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/utils/AuthContext";
import ProfileSidebar from "./ProfileSidebar";

function Header() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">

      {sidebarOpen && (
        <div
         className="fixed inset-0 bg-gray-100/30 backdrop-blur-md z-50 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <ProfileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button> */}

          <div className="flex items-center gap-2">
            <GraduationCap className="text-gray-800" size={24} />
            <span className="font-bold text-lg text-gray-800">WeAreTIG25</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">{/* <FriendsActivity /> */}</div>
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            {/* <Settings size={20} className="text-gray-600" /> */}
          </button>

          <div className="flex items-center gap-2"
               onClick={
               () => setSidebarOpen(true)}
          >
            <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden md:block">
              <span className="text-sm font-medium text-gray-800">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
