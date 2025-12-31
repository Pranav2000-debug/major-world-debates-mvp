import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicOnlyRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) {
    return <Navigate to="/" replace></Navigate>;
  }
  return <Outlet />;
}

export default PublicOnlyRoutes;
