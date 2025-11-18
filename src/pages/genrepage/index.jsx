import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSolution from "../../hooks/useFetchSolution";
import CardGame from "../../components/CardGame";

export default function GenrePage() {
  const { genre } = useParams();

  const [page, setPage] = useState(1);
  const [games, setGames] = useState([]);

  const url = `https://api.rawg.io/api/games?key=153d89dce0d04f65b4b5f171d87a8223&genres=${genre}&page=${page}`;

  const { data, loading, error, updateUrl } = useFetchSolution(url);
  useEffect(() => {
    setPage(1);
    setGames([]);
    updateUrl(
      `https://api.rawg.io/api/games?key=153d89dce0d04f65b4b5f171d87a8223&genres=${genre}&page=1`
    );
  }, [genre]);
  useEffect(() => {
    if (data?.results) {
      setGames((prev) => [...prev, ...data.results]);
    }
  }, [data]);
  useEffect(() => {
    if (page > 1) {
      updateUrl(url);
    }
  }, [page]);

  return (
    <section className="min-h-screen px-6 py-12 bg-[#0d1117] text-white">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-blue-400 drop-shadow-[0_0_10px_#3b82f6]">
          Giochi del genere <span className="capitalize">{genre}</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Scopri i migliori titoli di questo genere, direttamente dal database RAWG.io
        </p>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.length > 0 ? (
          games.map((game) => <CardGame key={game.id} game={game} />)
        ) : (
          !loading && (
            <p className="text-center text-gray-400 col-span-full">
              Nessun gioco trovato.
            </p>
          )
        )}
      </div>

      {/* Bottone Carica altri */}
      <div className="mt-12 text-center">
        <button
          disabled={loading}
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl text-white transition disabled:opacity-40"
        >
          {loading ? "Caricamento..." : "Carica altri"}
        </button>
      </div>

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
