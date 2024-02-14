import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const UserPost = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [allPosts, setAllPosts] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchUserPost = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://blogforge-server.onrender.com/api/post/user/${currentUser._id}`,
        { withCredentials: true }
      );
      setAllPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `https://blogforge-server.onrender.com/api/post/delete/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        fetchUserPost();
        toast.success("Post deleted Successfully", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#282828",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    fetchUserPost();
  }, []);

  return (
    <div className="container mx-auto lg:px-14 px-2 mb-8">
      {allPosts && allPosts.length > 0 ? (
        <h2 className="text-4xl font-bold mb-6 text-center my-5">
          Your Blogging Journey
        </h2>
      ) : (
        <div className="flex justify-center text-center flex-col">
          <p className="my-5 text-4xl font-bold">Please create a post</p>
          <NavLink
            className="bg-blue-400 text-white p-2 hover:bg-blue-500 rounded focus:outline-none mr-10"
            to="/post-create"
          >
            Create Post
          </NavLink>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                      className="w-full h-64 object-cover cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
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
                      <div className=""></div>
                      <div className="flex justify-between">
                        <NavLink
                          type="submit"
                          className="bg-blue-400 text-white p-2 hover:bg-blue-500 rounded focus:outline-none mr-10"
                          to={`/post/${post.slug}`}
                        >
                          Explore
                        </NavLink>
                        <NavLink
                          type="submit"
                          className="bg-yellow-500 text-white p-2 hover:bg-yellow-600 rounded focus:outline-none mr-10"
                          to={`/post/update/${post._id}`}
                        >
                          Update
                        </NavLink>
                        <button
                          type="button"
                          className="bg-red-500 text-white p-2 hover:bg-red-600 rounded focus:outline-none mr-10"
                          onClick={() => setDeleteConfirmation(post._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {deleteConfirmation && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-[#282828] p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold mb-4">
                  Are you sure you want to delete this post?
                </p>
                <div className="flex justify-center">
                  <button
                    className="bg-red-500 text-white px-4 py-2 mr-4 rounded"
                    onClick={() => {
                      handleDeleteBlog(deleteConfirmation);
                      setDeleteConfirmation(null);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    onClick={() => setDeleteConfirmation(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserPost;
