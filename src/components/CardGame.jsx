import { Link } from "react-router-dom";
import ToggleFavorite from "../components/ToggleFavorite"; 

export default function CardGame({ game }) {
  return (
    <div className="relative">


      <div
        className="
          absolute top-3 right-3 z-20
          bg-black/50 p-2 rounded-full
          hover:bg-black/70 transition
        "
      >
        <ToggleFavorite data={game} />
      </div>

      {/* CARD INTERA */}
      <Link
        to={`/games/${game.slug}/${game.id}`}
        className="
          group relative block overflow-hidden rounded-2xl
          bg-[#0f1629] border border-gray-800
          shadow-[0_0_10px_rgba(0,0,0,0.4)]
          transition-all duration-300
          hover:shadow-[0_0_25px_rgba(0,140,255,0.35)]
          hover:border-blue-500/40
        "
      >
        {/* IMG */}
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={game.background_image}
            alt={game.name}
            className="
              w-full h-full object-cover 
              transition-transform duration-500 
              group-hover:scale-110
              group-hover:opacity-90
            "
          />

          <div
            className="
              absolute inset-0 
              bg-gradient-to-t from-black/70 via-black/20 to-transparent
              opacity-80
            "
          />
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-3">
          <h3
            className="
              text-lg font-semibold text-gray-100 leading-tight
              group-hover:text-blue-400 transition-colors
            "
          >
            {game.name}
          </h3>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              ⭐ {game.rating?.toFixed(1)}
            </span>

            {game.metacritic && (
              <span
                className="
                  px-2 py-0.5 rounded-md text-xs font-bold 
                  bg-blue-600/20 text-blue-300 border border-blue-500/30
                "
              >
                {game.metacritic}
              </span>
            )}
          </div>

          {game.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {game.genres.slice(0, 2).map((g) => (
                <span
                  key={g.id}
                  className="
                    px-2 py-0.5 text-xs rounded-md
                    bg-gray-800 border border-gray-700
                    text-gray-300
                    group-hover:border-blue-600/40 transition
                  "
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
