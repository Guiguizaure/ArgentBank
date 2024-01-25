// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={authenticationPath} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
