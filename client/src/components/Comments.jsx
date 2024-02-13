import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

const Comments = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(comment.content);
  const currentUser = useSelector((state) => state.currentUser);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

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
      `http://localhost:3000/api/comment/editComment/${comment._id}`,
      { content: editingContent },
      { withCredentials: true }
    );

    if (response.status === 200) {
      setIsEditing(false);
      onEdit(comment, editingContent);
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
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white p-2 mt-2 hover:bg-green-600 rounded focus:outline-none mr-10"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-red-500 text-white p-2 mt-2 hover:bg-red-600 rounded focus:outline-none mr-10"
                  >
                    Cancel
                  </button>
                </div>
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
                      <button
                        onClick={handleEdit}
                        className="text-blue-500 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmation(comment._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
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
                      onDelete(comment._id);
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
        </div>
      )}
    </div>
  );
};

export default Comments;
