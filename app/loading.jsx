import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
