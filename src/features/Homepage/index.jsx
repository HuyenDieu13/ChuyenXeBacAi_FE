import React from "react";
import MainLayout from "../../layouts/MainLayout";

const Homepage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 text-4xl font-bold">
        Welcome to MyApp!
      </div>
    </MainLayout>
  );
}
export default Homepage;