import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/supabase-client";

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });


    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
}
