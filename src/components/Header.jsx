import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import Searchbar from "./Searchbar";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useContext(SessionContext);

  
  const [accountOpen, setAccountOpen] = useState(false);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    alert("Signed out 👋");
    navigate("/");
  };

  const displayName =
    session?.user?.user_metadata?.first_name ||
    session?.user?.email?.split("@")[0] ||
    "Account";

  const hideSearch =
    ["/login", "/register", "/account", "/profile"].includes(
      location.pathname
    );

  return (
    <>
      <header
        className="
        w-full bg-[#0d1117]
        border-b border-gray-800 shadow-lg
        py-4 px-6 flex items-center gap-4
        sticky top-0 z-50
      "
      >
        
        <Link
          to="/"
          className="
            text-2xl font-extrabold
            text-blue-400 hover:text-blue-300
            tracking-wide transition
            whitespace-nowrap
          "
        >
          Rehacktor
        </Link>

        
        {!hideSearch && (
          <div className="flex-1 flex justify-center px-2">
            <div className="w-full max-w-xl hidden md:block">
              <Searchbar />
            </div>
          </div>
        )}

        
        <nav className="flex items-center gap-6 text-gray-300 ml-auto">
          {session ? (
            <>
              
              <button
                onClick={() => setAccountOpen(true)}
                className="text-2xl hover:text-blue-400 transition md:hidden"
              >
                👤
              </button>

              
              <button
                onClick={() => setAccountOpen(true)}
                className="hidden md:block hover:text-blue-400 transition text-lg"
              >
                Hey {displayName} ✌️
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4 whitespace-nowrap">
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>

              <Link
                to="/register"
                className="
                bg-blue-600 hover:bg-blue-500
                text-white px-4 py-1.5 rounded-lg transition
              "
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>
     
      <div
        className={`
    fixed top-0 right-0 h-full w-72
    bg-[#111827] border-l border-gray-700
    shadow-2xl z-50 
    transform transition-transform duration-300
    ${accountOpen ? "translate-x-0" : "translate-x-full"}
  `}
      >
        
        <div className="flex items-center gap-3 p-5 border-b border-gray-700">
          <button
            onClick={() => setAccountOpen(false)}
            className="text-gray-300 hover:text-white text-xl transition"
          >
            ←
          </button>

          <h3 className="text-lg font-semibold text-white">Menu Account</h3>
        </div>

        
        <ul className="p-5 space-y-4">
          <li>
            <Link
              to="/account"
              onClick={() => setAccountOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Impostazioni account
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              onClick={() => setAccountOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-gray-800 text-blue-400 transition"
            >
              I miei giochi preferiti
            </Link>
          </li>

          <li>
            <button
              onClick={() => {
                setAccountOpen(false);
                signOut();
              }}
              className="
          block w-full text-left px-3 py-2 rounded-lg
          hover:bg-gray-800 text-red-400 transition
        "
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {accountOpen && (
        <div
          onClick={() => setAccountOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
}
