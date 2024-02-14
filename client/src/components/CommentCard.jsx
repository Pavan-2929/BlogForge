import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";

const CommentCard = ({ postId }) => {
  const [commentData, setCommentData] = useState("");
  const [allComments, setAllComments] = useState([]);
  const MAX_COMMENT_LENGTH = 200;

  const currentUser = useSelector((state) => state.currentUser);

  const handleChange = (e) => {
    setCommentData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/comment/create",
        {
          content: commentData,
          postId,
          userId: currentUser._id,
        },
        { withCredentials: true }
      );
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/comment/show/${postId}`
      );
      if (response.status === 200) {
        setAllComments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/comment/likeComment/${commentId}`,
        null,
        { withCredentials: true }
      );

      const data = response.data;

      setAllComments(
        allComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
            : comment
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (comment, editingContent) => {
    setAllComments(
      allComments.map((c) =>
        c._id === comment._id ? { ...c, content: editingContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    if (!currentUser) {
      alert("Login please");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/comment/deleteComment/${commentId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setAllComments(
          allComments.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      {currentUser ? (
        <>
          <div className="border border-gray-200 rounded-lg p-4 shadow-md my-10">
            <div className="flex items-center space-x-4 mb-4">
              <p className="text-sm">Signed in as:</p>
              <img
                src={currentUser.profilePicture}
                alt=""
                className="h-6 w-6 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              />
              <NavLink to="/profile">
                <p className="text-sm font-bold">@{currentUser.username}</p>
              </NavLink>
            </div>
            <div className="bg-[#444] rounded p-3 mb-4">
              <textarea
                value={commentData}
                onChange={handleChange}
                placeholder="Write your comment..."
                maxLength={MAX_COMMENT_LENGTH}
                className="bg-transparent w-full p-2 outline-none resize-none"
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <p className="text-md text-gray-500 mt-1">
                {MAX_COMMENT_LENGTH - commentData.length} characters remaining
              </p>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 
              "
              >
                Submit
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold my-5">
            {allComments.length} Comments
          </h1>
          {allComments.length === 0 ? (
            <p>No any comments yet!</p>
          ) : (
            allComments.map((comment) => (
              <Comments
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </>
      ) : (
        <p className="text-sm">
          You need to sign in first to comment on this post.
        </p>
      )}
    </div>
  );
};

export default CommentCard;
