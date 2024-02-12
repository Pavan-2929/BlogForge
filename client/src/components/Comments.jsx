import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

const Comments = ({ comment, onLike }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(comment.content);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    const getCommentUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${comment.userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCommentUser();
  }, [comment.userId]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditingContent(comment.content);
  };

  const handleSave = async () => {
    const response = await axios.put(
      `http://locahost:3000/api/comment/editComment`,
      { content: editingContent },
      { withCredentials: true }
    );

    if (response.status === 200) {
      setIsEditing(false);
      onEdit(comment, editingContent)
    }
  };

  return (
    <div className="comment-container border-b border-gray-200 py-4">
      {user && (
        <div className="flex items-start">
          <img
            src={user.profilePicture}
            alt="User Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-sm">{user.username}</p>
              <p className="text-xs text-gray-400">
                {moment(comment.createdAt).fromNow()}
              </p>
            </div>
            {isEditing ? (
              <>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="bg-[#444] text-white"
                ></textarea>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <p className="text-sm  mb-3">{comment.content}</p>
                <div className="flex items-center text-gray-500">
                  <FaThumbsUp
                    className={`cursor-pointer mr-1 ${
                      currentUser &&
                      comment.likes.includes(currentUser._id) &&
                      "text-blue-500"
                    }`}
                    onClick={() => onLike(comment._id)}
                  />
                  <p className="text-xs">
                    {comment.numberOfLikes > 0 &&
                      `${comment.numberOfLikes} ${
                        comment.numberOfLikes === 1 ? "Like" : "Likes"
                      }`}
                  </p>
                  {currentUser && currentUser._id === comment.userId && (
                    <div className="ml-10">
                      <button onClick={handleEdit}>edit</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
