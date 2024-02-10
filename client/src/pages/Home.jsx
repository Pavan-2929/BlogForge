import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/userSlice";
import { NavLink } from "react-router-dom";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);

  const [allPosts, setAllPosts] = useState([]);

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user", {
        withCredentials: true,
      });
      dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/post/getposts"
      );

      console.log(response);
      setAllPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserData();
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto lg:px-14 px-2 mb-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-semibold">
          Welcome to the world of Blogs!
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardComponent posts={allPosts}/>
      </div>
    </div>
  );
};

export default Home;
