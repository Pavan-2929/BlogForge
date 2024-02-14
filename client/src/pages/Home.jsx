import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/userSlice";
import { NavLink } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import Loader from "../components/Loader";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);

  const [isLoading, setIsLoading] = useState(false)
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
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/post/getposts"
      );
      setAllPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    if(isLoggedIn){
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto lg:px-14 px-2 mb-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-semibold">
          Welcome to the world of Blogs!
        </h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardComponent posts={allPosts} />
        </div>
      )}
    </div>
  );
};

export default Home;
