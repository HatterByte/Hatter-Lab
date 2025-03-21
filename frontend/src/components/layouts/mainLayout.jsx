import React from "react";
import Header from "../header";
import Footer from "../footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#262A2B]">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default MainLayout;
