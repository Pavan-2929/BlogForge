import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/");
        dispatch(logout());
        setIsMenuOpen(false);
      }
    } catch (error) {}
  };
  return (
    <nav
      className={`${
        isMenuOpen ? "bg-[#282828]" : ""
      } p-4 font-semibold border-b`}
    >
      <div className="md:flex justify-around items-center">
        <div className="text-[2rem] flex justify-around items-center relative">
          <span className="text-blue-400 animate-fire">BlogForge</span>
          <div onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <form className="flex bg-[#444] rounded px-4 py-2 my-5 md:my-0">
          <input
            type="text"
            className="focus:outline-none bg-transparent w-full sm:max-w-[250px] "
            placeholder="Search..."
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        <div>
          <ul
            className={`text-[1.3rem] md:flex ${
              isMenuOpen ? "block" : "hidden"
            } space-y-8 md:space-y-0 items-center flex flex-col md:flex-row justify-center `}
          >
            <li className="md:ml-5 xl:mx-5 sm:mt-0 mt-10 hover:text-blue-400">
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li className="md:ml-5 xl:mx-5 hover:text-blue-400">
                  <NavLink to="/register" onClick={logoutHandler}>
                    Logout
                  </NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-blue-400">
                  <NavLink to="/register" onClick={closeMenu}>
                    {currentUser && currentUser.profilePicture && (
                      <img
                        src={currentUser.profilePicture}
                        alt=""
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="md:ml-5 xl:mx-5 hover:text-blue-400">
                  <NavLink to="/register" onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-blue-400">
                  <NavLink to="/login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
