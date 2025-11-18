import { useContext, useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

export function FavoritesProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    

    if (!session) {
      
      setFavorites([]);
      setReady(true);
      return;
    }

    const fetchFavorites = async () => {
      

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) {
        
      } else {
        
        setFavorites(data);
      }

      setReady(true);
    };

    fetchFavorites();
  }, [session]);

  const addFavorite = async (game) => {
    if (!session) {
      
      return;
    }

   

    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: session.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();

    if (error) {
      
    } else {
      
      setFavorites((prev) => [...prev, ...data]);
    }
  };

  const removeFavorite = async (id) => {
    if (!session) return;
   

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", session.user.id)
      .eq("game_id", id);

    if (error) {
      
    } else {
      setFavorites((prev) => prev.filter((fav) => fav.game_id !== id));
      
    }
  };

  if (!ready) {
    return (
      <div className="text-gray-400 text-center p-6">
        Caricamento preferiti...
      </div>
    );
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, ready }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
