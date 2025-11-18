import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./global.css";
import SessionProvider from "./context/SessionProvider";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { UIProvider } from "./context/UiContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <FavoritesProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </FavoritesProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
