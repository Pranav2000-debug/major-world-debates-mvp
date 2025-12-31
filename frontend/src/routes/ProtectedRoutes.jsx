import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
