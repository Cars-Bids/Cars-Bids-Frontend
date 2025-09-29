import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Navigate } from "react-router-dom";
import Unauthorized from "@/pages/Errors/unauthorized";
import React from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  
  

 
  const role = useSelector((state: RootState) => state.auth.role);
 const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  console.log("ProtectedRoute - role:", role );
  if (!isAuth || !role || !allowedRoles.includes(role)) {
    return <Unauthorized />;
  }
  return children;
};

export default ProtectedRoute;