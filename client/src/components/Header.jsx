import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
