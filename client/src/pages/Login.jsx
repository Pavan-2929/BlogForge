import React, { useState } from "react";
import {NavLink} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="flex justify-around mt-6 ">
      <div className="hidden lg:flex">
        <img src="" alt="Register" className="w-[25rem] h-[30rem]" />
      </div>

      <form className="w-full lg:w-1/2 sm:p-14 p-6 rounded-lg mt-4 font-semibold bg-[#282828]" onSubmit={handleRegisterSubmit}>
        <h1 className="sm:text-5xl text-3xl font-bold mb-10 text-[#ccc]">
          Login with your account
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="text-blue-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141]  focus:bg-none rounded-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-blue-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-[#ccc] rounded-sm"
          />
        </div>

        <div className="block sm:flex justify-between items-center">
          <div>
            <button
              type="submit"
              className="bg-blue-400 text-white p-2 mt-5 hover:bg-blue-500 rounded focus:outline-none mr-10"
            >
              Login Now
            </button>
          </div>
          <div className="flex items-center text-[1.2rem]">
            <div className="mt-5">
              <h3 className="text-gray-300">Create an account?</h3>
            </div>
            <NavLink
              to="/register"
              className=" text-white p-2 mt-5 underline rounded ml-2 focus:outline-none"
            >
              Register
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
