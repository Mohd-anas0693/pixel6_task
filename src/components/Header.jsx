import React from 'react';
import { FaBars } from 'react-icons/fa'; 
import img from "../assets/p6-menu.svg"; 

function Header() {

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-300">
      <img src={img} alt="Logo" className="h-10" />
      <FaBars className="text-2xl cursor-pointer text-red-600" />
    </header>
  );
}

//exported Header
export default Header;
