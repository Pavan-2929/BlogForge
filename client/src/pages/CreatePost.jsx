import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [content, setContent] = useState("");

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

  return (
    <div className="p-3 max-w-3xl mx-auto sm:px-14 sm:py-6 sm:mt-5 bg-[#282828] rounded-sm">
      <h1 className="text-center text-4xl font-semibold mb-8">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            id="title"
            className="w-full p-2 border bg-[#414141] text-[#ccc] rounded-sm"
          />
          <select
            value={category}
            className="cursor-pointer p-2 border bg-[#414141] text-[#ccc] rounded-sm"
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-blue-200 border-dotted p-3 ">
          <input type="file" className="cursor-pointer" id="images" hidden />
          <label
            htmlFor="images"
            className="flex-1 p-3 border border-gray-300 rounded cursor-pointer bg-[#414141] text-white text-center"
          >
            Select Photo
          </label>
          <button
            type="button"
            className="bg-blue-400 text-white px-4 py-2 rounded-md"
          >
            Upload
          </button>
        </div>
        <ReactQuill
          modules={module}
          theme="snow"
          placeholder="Write something..."
          className="h-56 mb-12 bg-[#414141] text-white quill-placeholder "
          required
        />
        <button
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 rounded-md"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
