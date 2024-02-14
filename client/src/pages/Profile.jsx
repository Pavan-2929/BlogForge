import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout, setUser } from "../redux/auth/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef();
  const currentUser = useSelector((state) => state.currentUser);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    profilePicture: currentUser?.profilePicture || "",
  });
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/update",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(login());
        dispatch(setUser(formData));
        toast.success("User updated successfully", {
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

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/logout",
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/");
        dispatch(logout());
        toast.success("Logout Successful", {
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/user/delete",
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/");
        dispatch(logout());
        toast.success("User deleted Successfully", {
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
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  return (
    <div className="flex justify-around mt-6">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 sm:p p-6 rounded-lg font-semibold bg-[#282828]"
      >
        <h1 className="sm:text-5xl text-4xl font-bold mb-10 text-[#ccc] text-center">
          Your Profile
        </h1>

        <div>
          <input
            type="file"
            ref={fileRef}
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture}
            alt="Profile"
            className="rounded-full w-20 h-20 object-cover mx-auto mb-4"
            onClick={(e) => fileRef.current.click()}
          />
          <p className="font-semibold">
            {imageError ? (
              <span className="text-red-700">
                Error Uploading Image (Image should be less than 2 MB)
              </span>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              <span className="text-yellow-500">{`Uploading ${imagePercentage}%`}</span>
            ) : imagePercentage === 100 ? (
              <span className="text-green-500">Image uploaded</span>
            ) : (
              ""
            )}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="text-purple-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-[#ccc] rounded-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-purple-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-[#ccc] rounded-sm disabled:opacity-60"
            disabled
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-purple-700">
            New Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-[#ccc] rounded-sm"
          />
        </div>

        <div className="mb-4 flex justify-center">
          <button
            type="submit"
            className="bg-purple-700 text-white p-2 mt-5 hover:bg-purple-900 rounded"
          >
            Update Profile
          </button>
        </div>
        <div className="flex justify-between mt-4 text-[1.2rem] =">
          <div
            className="cursor-pointer underline text-yellow-500"
            onClick={handleLogout}
          >
            Signout
          </div>
          <div
            className="cursor-pointer underline text-red-500"
            onClick={handleDelete}
          >
            Delete Account
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
