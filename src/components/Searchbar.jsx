import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (typeof search === "string" && search.trim().length > 0) {
      navigate(`/search?query=${search.trim()}`);
      setSearch("");
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        relative
        flex items-center
        w-full 
        mx-auto
        max-w-sm 
        sm:max-w-md 
        md:max-w-lg 
        lg:max-w-xl
        group
      "
    >
      
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={
          isInvalid ? "Inserisci un nome valido" : "Cerca tra 500.000+ giochi..."
        }
        className="
          w-full
          pl-5 pr-14 py-2.5
          rounded-full
          bg-[#1e293b]/90
          text-gray-100
          placeholder-gray-500
          border border-gray-700
          shadow-[0_0_0_1px_rgba(0,0,0,0.3)]
          
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-600/40
          focus:shadow-[0_0_12px_rgba(59,130,246,0.4)]
          
          transition-all duration-200
        "
      />

      
      <button
        type="submit"
        className="
          absolute right-2
          flex items-center justify-center
          px-4 py-1.5 
          rounded-full
          
          bg-blue-600
          hover:bg-blue-500
          active:scale-95
          
          text-white text-sm font-semibold
          transition-all duration-200
          shadow-[0_0_10px_rgba(59,130,246,0.35)]
          hover:shadow-[0_0_14px_rgba(59,130,246,0.6)]
        "
      >
        Cerca
      </button>

      
      <div
        className="
          absolute inset-0 rounded-full
          pointer-events-none

          opacity-0 group-focus-within:opacity-100
          transition duration-300

          bg-gradient-to-r from-blue-600/20 via-blue-400/20 to-blue-600/20
          blur-xl
        "
      ></div>
    </form>
  );
}
