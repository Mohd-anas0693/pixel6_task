import React from 'react';
import { FaBars } from 'react-icons/fa'; // Import hamburger icon from react-icons
import img from "../../assets/p6-menu.svg"; // Adjust the path as needed

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-300">
      <img src={img} alt="Logo" className="h-10" />
      <FaBars className="text-2xl cursor-pointer text-red-500" />
    </header>
  );
}

export default Header;
