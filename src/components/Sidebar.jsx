import { useState, useContext } from "react";
import GenresDropdown from "./GenresDropdown";
import UIContext from "../context/UiContext";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { resetGenres } = useContext(UIContext);

  return (
    <>
      {/* MOBILE — TASTO GENERI */}
      <div className="md:hidden flex justify-start p-4 bg-[#0d1117] border-b border-gray-800">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-md"
        >
          🎮 Generi
        </button>
      </div>

      {/* SIDEBAR MOBILE + DESKTOP */}
      <aside
        className={`
          fixed md:static top-0 left-0 
          h-full md:h-auto
          bg-[#0f172a] border-r border-gray-800 z-40

          px-5 py-6 md:p-4 lg:p-5

          w-72 md:w-48 lg:w-56 xl:w-64

          transform transition-transform duration-300 ease-out
          shadow-xl md:shadow-none

          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER MOBILE */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold text-white">Generi</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white text-2xl transition"
          >
            ✖
          </button>
        </div>

        {/* CONTENUTO */}
        <div className="space-y-6">
          <h2 className="hidden md:block text-xl font-semibold text-white">
            Generi
          </h2>

          <GenresDropdown reset={resetGenres} />
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
        />
      )}
    </>
  );
}
