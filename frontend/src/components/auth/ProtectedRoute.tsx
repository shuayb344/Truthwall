import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";

interface ProtectedRouteProps {
  adminOnly?: boolean;
}
const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly &&  user?.role !== "admin") {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;