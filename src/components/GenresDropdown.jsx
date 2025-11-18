import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchSolution from "../hooks/useFetchSolution";

export default function GenresDropdown({ reset }) {
  const initialUrl =
    "https://api.rawg.io/api/genres?key=153d89dce0d04f65b4b5f171d87a8223";
  const { data, loading, error } = useFetchSolution(initialUrl);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (slug) => {
    setSelected(slug);
    setOpen(false);
    navigate(`/games/${slug}`);
  };

  useEffect(() => {
    if (reset) {
      setSelected("");
    }
  }, [reset]);

  return (
    <div className="
      w-full p-4 rounded-xl  
      bg-gradient-to-b from-[#0f151f] to-[#0a0e14] 
      border border-gray-800 shadow-[0_0_10px_rgba(0,0,0,0.25)]
      backdrop-blur-sm
    ">
      <label className="block text-gray-300 font-semibold mb-3 text-xs uppercase tracking-wide">
        🎮 Scegli un genere
      </label>

      {loading && <p className="text-gray-400 text-sm">Caricamento...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="relative">

          <button
            onClick={() => setOpen((o) => !o)}
            className="
              w-full bg-[#111827] border border-gray-700 
              text-gray-100 rounded-lg px-4 py-2.5 
              flex justify-between items-center
              hover:bg-[#1a2332]
              focus:ring-2 focus:ring-blue-500 transition
            "
          >
            {selected
              ? data.results.find((g) => g.slug === selected)?.name
              : "Seleziona un genere..."}

            <span className="text-gray-400 ml-3">
              {open ? "▲" : "▼"}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <ul
              className="
                absolute left-0 right-0 mt-2 bg-[#111827] 
                border border-gray-700 rounded-lg py-2 
                shadow-xl max-h-52 overflow-y-auto z-20
              "
            >
              {data.results.map((genre) => (
                <li
                  key={genre.id}
                  onClick={() => handleSelect(genre.slug)}
                  className="
                    px-4 py-2 text-gray-200 cursor-pointer 
                    hover:bg-[#1a2332] transition
                  "
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
