import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GenresDropdown from "../components/GenresDropdown";

export default function Layout() {
  const location = useLocation();

  const pagesWithoutSidebar = ["/account", "/profile", "/register", "/login"];
  const hideSidebar = pagesWithoutSidebar.some((path) =>
    location.pathname.startsWith(path)
  );


  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117] text-white">

      {/* HEADER */}
      <Header />

      
      {!hideSidebar && (
        <div className="md:hidden flex justify-start px-4 mt-3">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Generi
          </button>
        </div>
      )}

      
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#111827] border-r border-gray-700 z-50 p-6 transform transition-transform duration-300 ${
          showMobileFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white font-semibold">Generi</h2>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✖
          </button>
        </div>

        <GenresDropdown />
      </div>

      
      {showMobileFilters && (
        <div
          onClick={() => setShowMobileFilters(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* MAIN */}
      <main className="flex flex-col md:flex-row flex-grow">

        {/* SIDEBAR DESKTOP */}
        {!hideSidebar && (
          <aside className="hidden md:block md:w-1/4 lg:w-1/5 bg-[#111827] p-4 border-r border-gray-800">
            <GenresDropdown />
          </aside>
        )}

        {/* CONTENUTO */}
        <section
          className={`flex-grow p-6 overflow-y-auto bg-[#0f172a] shadow-inner ${
            hideSidebar ? "flex justify-center" : ""
          }`}
        >
          <Outlet />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
