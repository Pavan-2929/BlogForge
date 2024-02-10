import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/getpost/${slug}`
        );
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <main className="p-3 px-14 rounded-md flex flex-col max-w-6xl mx-auto min-h-screen bg-[#282828] mt-10 ">
      <h1 className="text-3xl mt-2 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <button>{post && post.category}</button>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-4 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
};

export default SinglePost;
