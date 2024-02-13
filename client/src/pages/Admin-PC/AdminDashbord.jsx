import React from "react";

import { NavLink, Outlet } from "react-router-dom";

const AdminDashbord = () => {
  return (
    <div className="mt-10">
      <NavLink to="/admin/users">Users-Data</NavLink>
      <NavLink to="/admin/posts">Blogs-Data</NavLink>
      <Outlet />
    </div>
  );
};

export default AdminDashbord;
