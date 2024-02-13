import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div>
      {currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export default AdminPrivateRoute;
