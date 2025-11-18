import { useParams } from "react-router-dom";
import useFetchSolution from "../../hooks/useFetchSolution";
import Chatbox from "../../components/ChatBox";

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=153d89dce0d04f65b4b5f171d87a8223`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <section className="min-h-screen px-6 pt-12 pb-32 bg-[#0d1117] text-white">
      {loading && <p className="text-center text-gray-400 pt-10">Loading...</p>}
      {error && <p className="text-center text-red-500 pt-10">{error}</p>}

      {data && (
        <>
          <div
            className="relative w-full h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden"
            style={{
              backgroundImage: `url(${data.background_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(14px) brightness(0.35)",
            }}
          ></div>
          <div className="max-w-7xl mx-auto px-4 md:px-10 mt-16 relative z-10">
            <img
              src={data.background_image}
              alt={data.name}
              className="w-full max-h-[460px] object-contain rounded-xl shadow-xl"
            />
          </div>
          <div className="max-w-7xl mx-auto px-10 mt-16 relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)]">
              {data.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-12 text-sm">
              {data.rating && (
                <span className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-blue-400 font-semibold">
                  ⭐ {data.rating.toFixed(1)}
                </span>
              )}

              {data.metacritic && (
                <span className="px-3 py-1 rounded-lg bg-green-700/20 border border-green-700 text-green-400 font-semibold">
                  Metacritic: {data.metacritic}
                </span>
              )}

              {data.released && (
                <span className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-gray-300">
                  🗓️ {data.released}
                </span>
              )}
            </div>
            {data.genres && (
              <div className="flex flex-wrap gap-3 mb-10">
                {data.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}
            {data.platforms && (
              <div className="flex flex-wrap gap-3 mb-12">
                {data.platforms.map((p) => (
                  <span
                    key={p.platform.id}
                    className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm"
                  >
                    🎮 {p.platform.name}
                  </span>
                ))}
              </div>
            )}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 mb-16 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">
                Descrizione
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {data.description_raw}
              </p>
            </div>
            <div className="mb-24">
              <Chatbox data={data} />
            </div>

          </div>
        </>
      )}
    </section>
  );
}
