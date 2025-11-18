import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../layout/Layout";
import HomePage from "../pages/homepage";
import GenrePage from "../pages/genrepage";
import GamePage from "../pages/gamepage";
import SearchPage from "../pages/searchpage";
import ErrorPage from "../pages/error";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import AccountPage from "../pages/account";
import ProfilePage from "../pages/profile";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="/games/:genre" element={<GenrePage />} />
        <Route path="/games/:slug/:id" element={<GamePage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotte protette */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
