import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ReactNode } from "react";

export interface RequireAuthProps {
  children?: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
}
