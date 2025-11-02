"use client";
import MainPage from "@/components/MainPage";
import UserSignin from "@/components/UserSignin";
import DebugAuth from "@/components/DebugAuth"; // Import debug component
import { useAuth } from "@/utils/AuthContext";
import Loading from "./loading";

export default function Home() {
  const { user, loading } = useAuth();

  // Show loading while checking auth
  // if (loading) {
  //   return (
  //     <div className="container mx-auto p-6">
  //       {/* Debug panel - hapus setelah berhasil */}
  //       <DebugAuth />
        
  //       <div className="text-center">
  //         <div className="flex flex-col items-center justify-center min-h-screen">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
  //           <p className="text-gray-600">Checking authentication...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if(loading) {
  //   return <Loading />;
  // }

  // Show login if no user
  if (!user) {
    return (
      <div>
        {/* <div className="container mx-auto p-6">
          <DebugAuth />
        </div> */}
        <UserSignin />
      </div>
    );
  }

  
  return (
    <div>
      {/* Debug Auth */}
      {/* <div className="container mx-auto p-6">
        <DebugAuth />
      </div> */}
      <MainPage />
    </div>
  );
}