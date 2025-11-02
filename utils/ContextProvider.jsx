"use client";
import { createContext, useState, useContext, useMemo } from "react";
import Dashboard from "@/pages/Dashboard";
import Schedule from "@/pages/Schedule";
import Assignment from "@/pages/Assignment";
import Announcement from "@/pages/Announcement";
import Discuss from "@/pages/Discuss";
import Students from "@/pages/Students";
import CashFlow from "@/pages/CashFlow";
import {
  University,
  CalendarDays,
  NotebookPen,
  MessageSquare,
  Megaphone,
  Archive,
  BookUser,
  Wallet,
} from "lucide-react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  
  // Simpan reference komponen, bukan JSX elements
  const pageItems = useMemo(() => [
    { text: "Dashboard", icon: University, component: Dashboard },
    { text: "Jadwal", icon: CalendarDays, component: Schedule },
    { text: "Tugas", icon: NotebookPen, component: Assignment },
    { text: "Diskusi", icon: MessageSquare, component: Discuss },
    { text: "Kas Kelas", icon: Wallet, component: CashFlow },
    { text: "Mahasiswa", icon: BookUser, component: Students },
  ], []);

  const [activeItem, setActiveItem] = useState(pageItems[0].text);

  // Function untuk mendapatkan komponen aktif
  const getCurrentPageComponent = () => {
    const currentPage = pageItems.find(item => item.text === activeItem);
    const Component = currentPage?.component;
    return Component ? <Component /> : null;
  };

  // const login = (userData, userToken) => {
  //   localStorage.setItem("USER_DATA", JSON.stringify(userData));
  //   localStorage.setItem("ACCESS_TOKEN", userToken);
  //   setUser(userData);
  //   setToken(userToken);
  // };

  // const logout = () => {
  //   localStorage.removeItem("USER_DATA");
  //   localStorage.removeItem("ACCESS_TOKEN");
  //   setUser(null);
  //   setToken(null);
  // };

  return (
    <StateContext.Provider
      value={{
        // user,
        // token,
        // login,
        // logout,
        pageItems,
        activeItem,
        setActiveItem,
        getCurrentPageComponent,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuthContext = () => useContext(StateContext);