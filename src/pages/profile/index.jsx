import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function Profile() {
  const { session } = useContext(SessionContext);
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext || !favoritesContext.ready) {
    return (
      <div className="flex justify-center mt-20 text-gray-400 text-lg">
        Caricamento dei tuoi preferiti...
      </div>
    );
  }

  const { favorites, removeFavorite } = favoritesContext;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-white animate-fadeIn">

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-10 drop-shadow-lg">
        La tua Control Room, {session?.user?.user_metadata?.first_name || "User"} 🎮
      </h2>

      {/* Wrapper */}
      <div className="bg-[#111827] p-8 rounded-2xl shadow-xl border border-gray-700">

        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          ❤️ I miei giochi preferiti
        </h3>

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Non hai ancora aggiunto preferiti...</p>
            <p className="text-sm mt-1">Vai su un gioco e premi il ❤️</p>
          </div>
        ) : (
          
          <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((game) => (
              <div
                key={game.game_id}
                className="
                  bg-[#1b2436] rounded-xl overflow-hidden 
                  border border-gray-700 shadow-md
                  hover:shadow-blue-500/30 hover:border-blue-500/40 
                  transition-all duration-300 
                  group flex flex-col
                "
              >
                {/* IMAGE */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={game.game_image}
                    alt={game.game_name}
                    className="
                      w-full h-full object-cover
                      group-hover:scale-110 
                      transition-transform duration-500
                    "
                  />

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* TEXT */}
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="text-lg font-semibold text-center mb-3">
                    {game.game_name}
                  </h4>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => removeFavorite(game.game_id)}
                    className="
                      mt-auto py-2 rounded-lg 
                      bg-red-600 hover:bg-red-500 
                      transition flex items-center justify-center gap-2
                      text-sm font-medium
                    "
                  >
                    <FaTrashAlt /> Rimuovi
                  </button>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
}
