import { useEffect, useState } from "react";
import useFetchSolution from "../../hooks/useFetchSolution";
import CardGame from "../../components/CardGame";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [games, setGames] = useState([]);

  const url = `https://api.rawg.io/api/games?key=153d89dce0d04f65b4b5f171d87a8223&page=${page}`;
  const { data, loading, error, updateUrl } = useFetchSolution(url);

  useEffect(() => {
    updateUrl(url);
  }, [page]);

  useEffect(() => {
    if (data?.results) {
      setGames((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  const loadMore = () => {
    if (!loading) setPage((prev) => prev + 1);
  };

  return (
    <section className="min-h-screen px-6 py-12 bg-[#0d1117] text-white">

      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-blue-400 drop-shadow-[0_0_10px_#3b82f6]">
          Rehacktor Game Library
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Scopri i giochi più popolari — dati forniti da{" "}
          <span className="text-blue-400 font-medium">RAWG.io</span>
        </p>
      </div>

      {/* ERROR */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>

      {/* BOTTONE "CARICA ALTRI" */}
      <div className="flex justify-center mt-10">
        {!loading && (
          <button
            onClick={loadMore}
            className="
              bg-blue-600 hover:bg-blue-500 
              text-white font-semibold 
              px-6 py-3 rounded-lg 
              transition shadow-lg
            "
          >
            Carica altri giochi
          </button>
        )}

        {loading && (
          <p className="text-gray-400 animate-pulse mt-4">
            Caricamento...
          </p>
        )}
      </div>

      {/* COPYRIGHT */}
      <div className="mt-12 text-center text-xs text-gray-500">
        Dati forniti da{" "}
        <a
          href="https://rawg.io/apidocs"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300 transition"
        >
          RAWG API
        </a>
      </div>
    </section>
  );
}
