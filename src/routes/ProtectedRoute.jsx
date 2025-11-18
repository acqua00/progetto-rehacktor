import { useContext } from "react";
import { Navigate } from "react-router-dom";
import SessionContext from "../context/SessionContext";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useContext(SessionContext);

 
  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        Loading...
      </div>
    );
  }


  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
