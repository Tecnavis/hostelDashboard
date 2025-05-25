import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
  const auth = JSON.parse(localStorage.getItem("admin")) ||  JSON.parse(localStorage.getItem("owner")) ;

  return auth && auth.token   ? <Outlet /> : <Navigate to="/login" />;
}
