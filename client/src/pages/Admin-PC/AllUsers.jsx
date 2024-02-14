import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Loader from "../../components/Loader";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllUsersData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/getAllUsersData",
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUsers(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, []);
  return (
    <div className="overflow-x-auto">
      <h1 className="text-center font-bold text-4xl my-5">All Users</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <table className="table-auto min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 md:px-6 md:py-3">
                  Profile Picture
                </th>
                <th className="border px-4 py-2 md:px-6 md:py-3">Username</th>
                <th className="border px-4 py-2 md:px-6 md:py-3">Email</th>
                <th className="border px-4 py-2 md:px-6 md:py-3">Is Admin</th>
                <th className="border px-4 py-2 md:px-6 md:py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border">
                    <td className="border px-4 py-2 md:px-6 md:py-3">
                      <img
                        src={user.profilePicture}
                        alt=""
                        className="h-10 w-10 md:h-12 md:w-12 rounded-full"
                      />
                    </td>
                    <td className="border px-4 py-2 md:px-6 md:py-3">
                      {user.username}
                    </td>
                    <td className="border px-4 py-2 md:px-6 md:py-3">
                      {user.email}
                    </td>
                    <td className="border px-4 py-2 md:px-6 md:py-3">
                      {user.isAdmin ? "Yes" : "No"}
                    </td>
                    <td className="border px-4 py-2 md:px-6 md:py-3">
                      {moment(user.createdAt).fromNow()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border text-center py-4">
                    Can not find any user
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AllUsers;
