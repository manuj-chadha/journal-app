import React from "react";
import { Toaster } from "sonner";
import "react-quill-new/dist/quill.snow.css";
import Header from "@/components/shared/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { useLocation } from "react-router-dom";

function Layout({ children }) {

  const { pathname } = useLocation();
  const hideLayout = pathname === "/login" || pathname === "/signup";

  return (
    <>
    <ScrollToTop />
      <div className="inset-0 bg-[url('/bg.jpg')] opacity-50 fixed -z-10" />

       {!hideLayout && <Header />}

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Toast Notifications */}
      <Toaster richColors />

      {/* Footer */}
      {!hideLayout && (
        <footer className="py-12">
          <div className="container mx-auto px-4 text-center text-gray-900">
            <p>Made with ❤ by Manuj Chadha</p>
          </div>
        </footer>
      )}
    </>
  );
}

export default Layout;
