"use client";

import Loading from "@/app/loading";
import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      const savedTheme = localStorage.getItem("darkMode");

      let initialDarkMode = false;
      if (savedTheme !== null) {
        initialDarkMode = savedTheme === "true";
      }

      setIsDarkMode(initialDarkMode);

      if (initialDarkMode) {
        html.classList.add("dark");
        html.classList.remove("light");
      } else {
        html.classList.remove("dark");
        html.classList.add("light");
      }

      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;

    localStorage.setItem("darkMode", isDarkMode.toString());

    if (isDarkMode) {
      html.classList.add("dark");
      html.classList.remove("light");
      html.setAttribute("data-theme", "dark");
      html.style.colorScheme = "dark";
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      html.setAttribute("data-theme", "light");
      html.style.colorScheme = "light";
    }

    console.log("Dark mode toggled to:", isDarkMode);
    console.log("HTML classes:", html.className);
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  if (!mounted) {
    return <Loading />;
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  
  return context;
};
