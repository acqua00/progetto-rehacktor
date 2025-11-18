import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ data }) {
  const favoritesContext = useContext(FavoritesContext);
  const [loading, setLoading] = useState(false);

  
  if (!favoritesContext || !favoritesContext.ready) {
    return null;
  }

  const { favorites, addFavorite, removeFavorite } = favoritesContext;

  
  const isFavorite = favorites.some((fav) => fav.game_id === data.id);

  const handleToggle = async () => {
    if (loading) return; 
    setLoading(true);

    try {
     

      if (isFavorite) {
        await removeFavorite(data.id);
      } else {
        await addFavorite(data);
      }
    } catch (err) {
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-full bg-black/40 hover:bg-black/60 transition 
      ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
    >
      {isFavorite ? (
        <FaHeart
          className="text-red-500 transition-transform transform scale-110 drop-shadow-[0_0_6px_#ef4444]" 
          size={20}
        />
      ) : (
        <FaRegHeart
          className="text-gray-300 hover:text-red-400 transition-transform transform"
          size={20}
        />
      )}
    </button>
  );
}
