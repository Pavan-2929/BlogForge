import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllPostsData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/admin/getAllPostsData",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setPosts(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch posts:", error);
        setIsLoading(false);
      }
    };

    fetchAllPostsData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts && posts.map((post) => (
            <div
              key={post._id}
              className="bg-[#282828] rounded-lg shadow-md overflow-hidden "
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-60 object-cover cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 h-14 overflow-hidden">
                  {post.title}
                </h2>
                <p
                  className="text-sm text-gray-600 mb-4 overflow-hidden h-16"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></p>
                {post.userEmail && (
                  <p className="text-sm text-gray-300 font-semibold my-6">
                    {post.userEmail}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.profilePicture}
                      alt={post.username}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm">{post.username}</p>
                      <span className="text-xs text-gray-500">
                        {moment(post.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <NavLink
                      type="submit"
                      className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 focus:outline-none"
                      to={`post/${post.slug}`}
                    >
                      Explore
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div></div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
