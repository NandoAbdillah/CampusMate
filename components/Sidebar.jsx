import React, { useState } from "react";

import { useAuthContext } from "@/utils/ContextProvider";

const Sidebar = () => {

  const { pageItems, activeItem, setActiveItem, setMainPage} = useAuthContext();
  const menuItems = pageItems;


  const handleItemClick = (index) => {
    setActiveItem(menuItems[index].text);
    setMainPage(menuItems[index].page);
  };

  return (
    <aside
      className={`
        fixed  z-30
        bottom-6 left-1/2 -translate-x-1/2 
        h-auto p-1 w-auto
        flex items-center justify-center rounded-3xl
        md:inset-y-20 md:left-5 md:translate-x-0 md:w-20 md:h-auto md:p-2 md:flex-col
        bg-white/90 backdrop-blur-lg border border-blue-200/50 
        shadow-2xl shadow-blue-500/20
        transform transition-all duration-500 ease-in-out
        hover:shadow-3xl hover:shadow-blue-500/30
        before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
        before:bg-gradient-to-r before:from-blue-50/50 before:to-indigo-50/50 
        before:-z-10 before:blur-xl before:opacity-60
      `}
    >
      <nav className="p-2 md:p-3">
        <ul
          className="
            flex items-center justify-center space-x-2
            md:flex-col md:space-x-0 md:space-y-2
          "
        >
          {menuItems.map((item, index) => {
            const isActive = activeItem === item.text;
            return (
              <li key={item.text}>
                <button
                  onClick={() => handleItemClick(index)}
                  className={`
                    relative flex cursor-pointer items-center justify-center 
                    w-12 h-12 md:w-12 md:h-12
                    rounded-2xl transition-all duration-300 ease-out
                    transform focus:outline-none group
                    ${
                      isActive
                        ? `bg-gradient-to-br from-blue-500 to-indigo-600 text-white 
                         shadow-lg shadow-blue-500/40 scale-105
                         ring-2 ring-blue-300/60 ring-offset-2 ring-offset-white/50`
                        : `bg-blue-50/80 text-blue-700 hover:bg-blue-100 
                         hover:text-blue-800 hover:scale-105 hover:shadow-lg 
                         hover:shadow-blue-300/30 border border-blue-200/40`
                    }
                    active:scale-95 active:duration-75
                  `}
                  style={{
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <item.icon
                    size={20}
                    className={`
                      transition-all duration-300 ease-out 
                      ${isActive ? "scale-110" : "group-hover:scale-110"}
                    `}
                  />

                  {/* Active indicator dot */}
                  {isActive && (
                    <div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                      w-2 h-2 bg-white rounded-full shadow-sm
                      animate-pulse
                      md:hidden"
                    />
                  )}

                  {/* Desktop tooltip */}
                  <div
                    className="hidden md:block absolute left-full ml-4 top-1/2 transform -translate-y-1/2
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-300 ease-out delay-200
                      bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl
                      whitespace-nowrap z-50 pointer-events-none
                      before:content-[''] before:absolute before:right-full before:top-1/2 
                      before:transform before:-translate-y-1/2 before:border-[6px]
                      before:border-transparent before:border-r-gray-900
                      group-hover:translate-x-1"
                  >
                    {item.text}
                  </div>

                  {/* Mobile label */}
                  <div
                    className="md:hidden absolute -top-8 left-1/2 transform -translate-x-1/2
                    opacity-0 group-active:opacity-100 transition-opacity duration-1000
                    bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg
                    whitespace-nowrap z-50 pointer-events-none"
                  >
                    {item.text}
                  </div>

                  {/* Ripple effect untuk mobile */}
                  <span className="absolute inset-0 rounded-2xl overflow-hidden">
                    <span
                      className="absolute inset-0 rounded-2xl bg-white/30 
                      scale-0 group-active:scale-100 transition-transform duration-300 ease-out
                      md:hidden"
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Gradient glow effect */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-100/20 to-indigo-100/20 
        blur-sm -z-10 scale-110 opacity-80"
      />
    </aside>
  );
};

export default Sidebar;
