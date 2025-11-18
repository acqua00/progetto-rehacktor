import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Credenziali non valide ❌");
      return;
    }

    navigate("/account");
  };

  return (
    <div className="flex items-center justify-center min-height-screen px-4 py-16 bg-[#0d1117] text-white">
      <div
        className="
          w-full max-w-md 
          rounded-2xl 
          p-10 
          bg-[#0f1629]/80 
          backdrop-blur-md
          shadow-[0_0_25px_rgba(63,131,248,0.25)]
          border border-gray-700/40
        "
      >
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">
          Login
        </h2>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="
                w-full px-4 py-3 rounded-xl 
                bg-[#1a2335]/70 border border-gray-700/40 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition outline-none text-gray-100
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="
                w-full px-4 py-3 rounded-xl 
                bg-[#1a2335]/70 border border-gray-700/40
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition outline-none text-gray-100
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl 
              bg-blue-600 hover:bg-blue-500 
              text-white font-semibold
              shadow-md shadow-blue-500/30
              transition
            "
          >
            Accedi
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Non hai un account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}
