import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-center text-2xl">
        <NavLink
          to="/admin/users"
          className="mr-4 px-4 py-2 border-b-2 border-transparent hover:border-blue-400 transition duration-300"
        >
          Users Data
        </NavLink>
        <NavLink
          to="/admin/posts"
          className="px-4 py-2 border-b-2 border-transparent hover:border-blue-400 transition duration-300"
        >
          Blogs Data
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
