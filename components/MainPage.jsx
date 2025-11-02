import React, { useState } from "react";
import { Star, User } from "lucide-react";
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
import Header from "./Header";
import Sidebar from "./Sidebar";


import { useAuthContext } from "@/utils/ContextProvider";


// Friends Activity Component
// const FriendsActivity = () => {
//   const friends = [
//     { id: 1, color: "bg-purple-400" },
//     { id: 2, color: "bg-blue-400" },
//     { id: 3, color: "bg-green-400" },
//     { id: 4, color: "bg-yellow-400" },
//   ];

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex -space-x-2">
//         {friends.map((friend) => (
//           <div
//             key={friend.id}
//             className={`w-6 h-6 ${friend.color} rounded-full border-2 border-white flex items-center justify-center`}
//           >
//             <User size={12} className="text-white" />
//           </div>
//         ))}
//       </div>
//       <span className="text-sm text-gray-600">274 Friends</span>
//     </div>
//   );
// };

// Main App Component
const MainPage = () => {
  const { getCurrentPageComponent } = useAuthContext();

  return (
    <div className=" relative min-h-screen max-w-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
    
      <Header />

      <div className="flex relative left-0 ">
        
        <Sidebar />

        {/* Overlay for mobile */}
        {/* {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )} */}

        <main className="flex-1 md:ml-20 p-4 md:p-6">
          {getCurrentPageComponent()}
        </main>
      </div>
    </div>
  );
};

export default MainPage;
