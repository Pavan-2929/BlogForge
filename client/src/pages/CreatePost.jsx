import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  var toolbarOptions = [
    ["bold", "italic", "underline"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["link"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const handleFileUpload = async () => {
    try {
      if (!image) {
        return;
      }
      const storage = getStorage(app);
      setImageLoading(true);
      const fileName = new Date().getTime() + "-" + image.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercentage(Math.round(progress));
        },
        (error) => {
          setImageError(true);
          setImageLoading(false);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, image: downloadURL })
          );
          setImageLoading(false);
        }
      );
    } catch (error) {
      setImageLoading(false);
      console.error("Error uploading file:", error);
      setImageError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://blogforge-server.onrender.com/api/post/create",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/");
        toast.success("Post created Successfully", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  return (
    <div className="p-3 max-w-3xl mx-auto sm:px-14 sm:py-6 sm:mt-5 bg-[#282828] rounded-sm">
      <h1 className="text-center text-4xl font-semibold mb-8">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
            required
            id="title"
            className="w-full p-2 border bg-[#414141] text-[#ccc] rounded-sm"
          />
          <select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData.category}
            className="cursor-pointer p-2 border bg-[#414141] text-[#ccc] rounded-sm"
          >
            <option value="uncategorized">Select a category</option>
            <option value="programming">Programming</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="health">Health</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-blue-200 border-dotted p-3 ">
          <input
            type="file"
            className="cursor-pointer"
            id="images"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label
            htmlFor="images"
            className="flex-1 p-3 border border-gray-300 rounded cursor-pointer bg-[#414141] text-white text-center"
          >
            Select Photo
          </label>
          <button
            type="button"
            onClick={handleFileUpload}
            className="bg-blue-400 text-white px-4 py-2 rounded-md"
          >
            {imageLoading
              ? "Uploading..."
              : imagePercentage === 100
              ? "Uploaded"
              : "Upload"}
          </button>
        </div>
        <ReactQuill
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          id="content"
          value={formData.content}
          modules={module}
          theme="snow"
          className="h-56 mb-12 bg-[#414141] text-white quill-placeholder "
          required
        />
        <button
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 rounded-md mt-5 md:mt-0"
        >
          {loading ? "Loading..." : "Publish"}
        </button>
      </form>
    </div>
  );
}
