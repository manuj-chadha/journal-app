// src/components/layout/Layout.jsx
import React from "react";
// import Header from "../shared/Header"; // Adjust path if needed
import { Toaster } from "sonner"; // Make sure sonner is installed
// import "./index.css"; // Tailwind or global styles
import "react-quill-new/dist/quill.snow.css";
import Header from "@/components/shared/Header";
import ScrollToTop from "@/components/ScrollToTop";

function Layout({ children }) {
  return (
    <>
    <ScrollToTop />
      {/* Background Image Layer */}
      <div className="inset-0 bg-[url('/bg.jpg')] opacity-50 fixed -z-10" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Toast Notifications */}
      <Toaster richColors />

      {/* Footer */}
      <footer className="py-12">
        <div className="container mx-auto px-4 text-center text-gray-900">
          <p className="text-center">Made with 💗 by Manuj Chadha</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
