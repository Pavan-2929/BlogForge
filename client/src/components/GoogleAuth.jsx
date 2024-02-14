import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/userSlice";
import toast from "react-hot-toast";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const Provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, Provider);

      const response = await axios.post(
        "https://blogforge-server.onrender.com/api/auth/google",
        {
          username: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/");
        dispatch(login());
        toast.success("Login Successful", {
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
  return (
    <button
      type="submit"
      onClick={handleGoogleClick}
      className="bg-blue-400 text-white p-2 mt-5 hover:bg-blue-500 rounded"
    >
      Google
    </button>
  );
};

export default GoogleAuth;
