import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import { NavLink } from "react-router-dom";

const UserPost = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [allPosts, setAllPosts] = useState({});
  const fetchUserPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/user/${currentUser._id}`,
        { withCredentials: true }
      );
      setAllPosts(response.data);
      // console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserPost();
  }, []);

  return (
    <div className="container mx-auto lg:px-14 px-2 mb-8">
      <h2 className="text-4xl font-bold mb-6 text-center my-5">
        Your Blogging Journey
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPosts && allPosts.length > 0 && (
          <>
            {allPosts.map((post) => (
              <div
                key={post._id}
                className="bg-[#282828] rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 h-14">
                    {post.title}
                  </h2>
                  <p
                    className="text-sm text-gray-600 mb-4 overflow-hidden"
                    style={{
                      WebkitLineClamp: 5,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></p>
                  <div className="">
                    </div>
                    <div className="flex justify-between">
                      <NavLink
                        type="submit"
                        className="bg-blue-400 text-white p-2 hover:bg-blue-500 rounded focus:outline-none mr-10"
                        to={`post/${post.slug}`}
                      >
                        Explore
                      </NavLink>
                      <NavLink
                        type="submit"
                        className="bg-blue-400 text-white p-2 hover:bg-blue-500 rounded focus:outline-none mr-10"
                        to={`post/${post.slug}`}
                      >
                        Update
                      </NavLink>
                      <NavLink
                        type="submit"
                        className="bg-blue-400 text-white p-2 hover:bg-blue-500 rounded focus:outline-none mr-10"
                        to={`post/${post.slug}`}
                      >
                        Delete
                      </NavLink>
                    </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPost;
