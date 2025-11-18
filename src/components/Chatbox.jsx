import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealTimeChat";

export default function Chatbox({ data }) {
  const { session } = useContext(SessionContext);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const message = new FormData(form).get("message");

    if (!message || message.trim() === "") return;

    const { error } = await supabase.from("messages").insert([
      {
        profile_id: session?.user.id,
        profile_username: session?.user.user_metadata.username,
        game_id: data.id,
        content: message,
      },
    ]);

    if (!error) form.reset();
  };

  return (
    <div className="mt-10">
      <h3 className="mb-3 text-white font-semibold text-lg flex items-center gap-2">
        💬 Gamers Chat
      </h3>

      <RealtimeChat data={data} />

      {/* UTENTE NON LOGGATO */}
      {!session && (
        <div
          className="
            mt-3 p-3
            bg-[#1e293b]
            rounded-xl text-center
            text-gray-400 text-sm
          "
        >
          🔒 Devi accedere per inviare messaggi
        </div>
      )}

      {/* UTENTE LOGGATO */}
      {session && (
        <form
          onSubmit={handleMessageSubmit}
          className="
    mt-4
    flex flex-wrap md:flex-nowrap
    items-center gap-3 w-full
  "
        >

          {/* INPUT */}
          <input
            type="text"
            name="message"
            placeholder="Scrivi un messaggio…"
            className="
      flex-1 min-w-[200px]
      bg-[#243447]
      border border-gray-700
      text-white placeholder-gray-400
      px-4 py-3
      rounded-xl
      focus:ring-2 focus:ring-blue-500
      transition
      w-full
    "
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="
      px-5 py-3
      bg-blue-600 hover:bg-blue-500
      text-white
      rounded-xl
      font-semibold
      transition shadow
      w-full md:w-auto
    "
          >
            Invia
          </button>

        </form>

      )}
    </div>
  );
}
