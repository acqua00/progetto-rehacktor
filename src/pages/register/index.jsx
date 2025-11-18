import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../supabase/supabase-client";
import { ConfirmSchema, getErrors } from "../../lib/validationForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const setField = (field) => (e) =>
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const { error, data } = ConfirmSchema.safeParse(formState);

    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      return;
    }

    let { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          username: data.username,
        },
      },
    });

    if (signUpError) {
      alert("Errore durante la registrazione ❌");
    } else {
      alert("Registrazione completata ✅");
      navigate("/login");
    }
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
          Registrati
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={formState.email}
              onChange={setField("email")}
              className="
                w-full px-4 py-3 rounded-xl 
                bg-[#1a2335]/70 border border-gray-700/40 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition outline-none text-gray-100
              "
            />
            {formErrors.email && (
              <p className="text-red-400 text-xs">{formErrors.email}</p>
            )}
          </div>

          {/* Nome */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Nome</label>
            <input
              type="text"
              value={formState.firstName}
              onChange={setField("firstName")}
              className="
                w-full px-4 py-3 rounded-xl 
                bg-[#1a2335]/70 border border-gray-700/40 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition outline-none text-gray-100
              "
            />
            {formErrors.firstName && (
              <p className="text-red-400 text-xs">{formErrors.firstName}</p>
            )}
          </div>

          {/* Cognome */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Cognome</label>
            <input
              type="text"
              value={formState.lastName}
              onChange={setField("lastName")}
              className="
                w-full px-4 py-3 rounded-xl 
                bg-[#1a2335]/70 border border-gray-700/40 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition outline-none text-gray-100
              "
            />
            {formErrors.lastName && (
              <p className="text-red-400 text-xs">{formErrors.lastName}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Username</label>
            <input
              type="text"
              value={formState.username}
              onChange={setField("username")}
              className="
                w-full px-4 py-3 rounded-xl 
                bg-[#1a2335]/70 border border-gray-700/40 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition outline-none text-gray-100
              "
            />
            {formErrors.username && (
              <p className="text-red-400 text-xs">{formErrors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={formState.password}
              onChange={setField("password")}
              className="
                w-full px-4 py-3 rounded-xl 
                bg-[#1a2335]/70 border border-gray-700/40 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition outline-none text-gray-100
              "
            />
            {formErrors.password && (
              <p className="text-red-400 text-xs">{formErrors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 
              rounded-xl 
              bg-blue-600 hover:bg-blue-500
              shadow-md shadow-blue-500/30
              text-white font-semibold
              transition
            "
          >
            Registrati
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Hai già un account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}
