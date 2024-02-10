import React from 'react'
import { NavLink } from 'react-router-dom';

const CardComponent = ({posts}) => {
  return (
    <>
      {posts && posts.length > 0 && (
        <>
          {posts.map((post) => (
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.profilePicture}
                      alt={post.username}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <p className="text-sm">{post.username}</p>
                  </div>
                  <div>
                    <NavLink
                      type="submit"
                      className="bg-blue-400 text-white p-2 hover:bg-blue-500 rounded focus:outline-none mr-10"
                      to={`post/${post.slug}`}
                    >
                      Explore
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default CardComponent