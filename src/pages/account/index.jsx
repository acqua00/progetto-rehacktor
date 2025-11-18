import { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";

export default function AccountPage() {
  const { session } = useContext(SessionContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      if (!session?.user) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("username, first_name, last_name, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (error) {
        setErrorMessage("Errore nel caricamento del profilo");
      }

      if (!ignore && data) {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAvatarUrl(data.avatar_url);
      }

      setLoading(false);
    };

    getProfile();
    return () => (ignore = true);
  }, [session]);

  const updateProfile = async (e, newAvatarUrl) => {
    e.preventDefault();
    if (!session?.user) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const updates = {
      id: session.user.id,
      username,
      first_name,
      last_name,
      avatar_url: newAvatarUrl ?? avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      setErrorMessage("Errore durante il salvataggio.");
    } else {
      if (newAvatarUrl) setAvatarUrl(newAvatarUrl);
      setSuccessMessage("Profilo aggiornato con successo ✨");
    }

    setLoading(false);

    // Nasconde il messaggio dopo 3s
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <section className="min-h-screen px-4 py-12 bg-[#0d1117] text-white flex justify-center">
      <div
        className="
        w-full max-w-3xl
        bg-[#111827]
        border border-gray-700
        rounded-2xl
        shadow-xl
        p-10
        space-y-10
      "
      >
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-wide">Il tuo profilo</h2>
          <p className="text-gray-400 text-sm">
            Gestisci le informazioni del tuo account
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="bg-green-600/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg text-center animate-fadeIn">
            {successMessage}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="bg-red-600/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-center animate-fadeIn">
            {errorMessage}
          </div>
        )}

        {/* AVATAR SECTION */}
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(e, filePath) => updateProfile(e, filePath)}
          />
          <p className="text-gray-400 text-sm">Tocca l’immagine per cambiarla</p>
        </div>

        <div className="h-px w-full bg-gray-700/60" />

        {/* FORM */}
        <form onSubmit={(e) => updateProfile(e)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              disabled
              value={session?.user?.email}
              className="
                w-full bg-[#0f172a] border border-gray-700 
                px-4 py-3 rounded-lg text-gray-400
                cursor-not-allowed opacity-50
              "
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Username</label>
            <input
              value={username ?? ""}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full bg-[#0f172a] border border-gray-700 
                px-4 py-3 rounded-lg 
                focus:border-blue-500 outline-none
                transition
              "
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-300">Nome</label>
              <input
                value={first_name ?? ""}
                onChange={(e) => setFirstName(e.target.value)}
                className="
                  w-full bg-[#0f172a] border border-gray-700 
                  px-4 py-3 rounded-lg 
                  focus:border-blue-500 outline-none transition
                "
              />
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-300">Cognome</label>
              <input
                value={last_name ?? ""}
                onChange={(e) => setLastName(e.target.value)}
                className="
                  w-full bg-[#0f172a] border border-gray-700 
                  px-4 py-3 rounded-lg 
                  focus:border-blue-500 outline-none transition
                "
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 
              rounded-lg 
              bg-blue-600 hover:bg-blue-500
              font-semibold transition
              shadow-md
              text-white
              disabled:opacity-50
            "
          >
            {loading ? "Salvataggio..." : "Salva modifiche"}
          </button>
        </form>
      </div>
    </section>
  );
}
