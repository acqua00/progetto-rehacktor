import { useEffect, useState, useRef, useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

export default function RealtimeChat({ data }) {
  const { session } = useContext(SessionContext);
  const userId = session?.user?.id;

  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    if (!data?.id) return;

    const loadMessages = async () => {
      setLoadingInitial(true);

      const { data: msgs, error } = await supabase
        .from("messages")
        .select("*")
        .eq("game_id", data.id)
        .order("id", { ascending: true });

      if (error) {
        console.error("🔥 Supabase error:", error);
        setError("Errore nel caricamento della chat");
      } else {
        setMessages(msgs);
      }

      setLoadingInitial(false);
    };

    loadMessages();
  }, [data]);

  useEffect(() => {
    if (!data?.id) return;

    const channel = supabase
      .channel("messages_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new;

          if (newMessage.game_id === data.id) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="
    w-full 
    max-h-[50vh] md:h-[300px]
    rounded-2xl overflow-y-auto
    bg-[#111827] border border-gray-800 
    p-3 md:p-4
    shadow-inner space-y-4
  "
    >

      {loadingInitial && (
        <p className="text-gray-400">Caricamento chat...</p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {messages.map((msg) => {
        const isMine = msg.profile_id === userId;

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-2 md:gap-3 animate-fadeIn ${isMine ? "justify-end" : "justify-start"
              }`}
          >
            {/* Avatar SOLO dei messaggi degli altri */}
            {!isMine && (
              <div className="
                w-8 h-8 md:w-10 md:h-10
                bg-blue-600/30 border border-blue-500/40 
                rounded-full flex items-center justify-center 
                text-blue-300 font-semibold text-sm md:text-base">
                {msg.profile_username?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}

            {/* Bubble */}
            <div
              className={`
              max-w-[70%] px-4 py-2 rounded-xl text-sm leading-relaxed shadow
              ${isMine
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-[#1f2937] text-gray-200 border border-gray-700 rounded-bl-none"
                }
            `}
            >
              {!isMine && (
                <span className="text-xs font-semibold text-blue-400 block mb-1">
                  {msg.profile_username}
                </span>
              )}
              {msg.content}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef}></div>
    </div>
  );
}
