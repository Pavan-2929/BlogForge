import React, { useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Register = () => {

  const [formData, setFormData] = useState({})

    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          formData,
          { withCredentials: true }
        );

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const handleChange = (e) => {
      e.preventDefault();
      setFormData({...formData, [e.target.id]: e.target.value})
    }
  return (
    <div className="flex justify-around items-center mt-6">
      <div className="hidden lg:flex">
        <img
          src=""
          alt="Register"
          className="w-[25rem] h-[30rem] object-cover rounded-lg"
        />
      </div>

      <form
        onSubmit={handleRegisterSubmit}
        className="w-full lg:w-1/2 sm:p-8 p-4 rounded-lg mt-4 font-semibold bg-[#282828]"
      >
        <h1 className="sm:text-5xl text-3xl font-bold mb-6 text-gray-300 text-center">
          Register with your account
        </h1>

        <div className="mb-4">
          <label htmlFor="username" className="text-purple-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-gray-300 rounded-sm focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-purple-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-gray-300 rounded-sm focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-purple-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-gray-300 rounded-sm focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-purple-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-gray-300 rounded-sm focus:outline-none"
          />
        </div>

        <div className="block sm:flex justify-between items-center">
          <div>
            <button
              type="submit"
              className="bg-purple-700 text-white p-2 mt-5 hover:bg-purple-900 rounded focus:outline-none mr-10"
            >
              Register Now
            </button>
          </div>
          <div className="flex items-center text-[1.2rem]">
            <div className="mt-5">
              <h3 className="text-gray-300">Have an account?</h3>
            </div>
            <NavLink
              to="/login"
              className=" text-white p-2 mt-5 underline rounded ml-2 focus:outline-none"
            >
              Login
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register