import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const game = searchParams.get("query");

  const initialUrl = `https://api.rawg.io/api/games?key=153d89dce0d04f65b4b5f171d87a8223&search=${game}`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [game]);

  return (
    <section className="min-h-screen px-6 py-12 bg-[#0d1117] text-white">
      <h1 className="text-center text-3xl font-bold text-blue-400 mb-10">
        Risultati per: <span className="capitalize">{game}</span>
      </h1>

      {loading && (
        <p className="text-center text-gray-400 animate-pulse">
          Caricamento in corso...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.results?.length > 0 ? (
          data.results.map((g) => <CardGame key={g.id} game={g} />)
        ) : (
          !loading && (
            <p className="text-center text-gray-400 col-span-full">
              Nessun risultato trovato per "{game}".
            </p>
          )
        )}
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
