"use client";
import React, { useContext, useState } from "react";
import { SearchBar } from "./SearchBar";
import { AuthContext } from "../context/AuthContext";

import { Home, Pen, Notebook, Bell, MessageSquare, User, Menu } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
   const auth = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!auth) return null; // fallback for safety
  const { logout } = auth;
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md py-2 px-6 flex justify-between items-center z-50">
      {/* Left: Logo and Search Bar */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-800 transition">
            Versify
          </span>
        </Link>
        <SearchBar />
      </div>

      {/* Center: Main Navigation Icons */}
      <div className="flex space-x-6">
        <Link href="/dashboard">
        <Home className="text-gray-600 hover:text-blue-500 cursor-pointer" size={24} />
        </Link>
        <Link href="/post">
        <Pen className="text-gray-600 hover:text-blue-500 cursor-pointer" size={24} />
        </Link>
        <Link href="/my-blogs">
        <Notebook className="text-gray-600 hover:text-blue-500 cursor-pointer" size={24} />
        </Link>
        <MessageSquare className="text-gray-600 hover:text-blue-500 cursor-pointer" size={24} />
        <Bell className="text-gray-600 hover:text-blue-500 cursor-pointer" size={24} />
      </div>

      {/* Right: Profile & Menu */}
      {/* <div className="flex items-center space-x-4"> */}
 {/* Right: User Dropdown */}
      <div className="relative flex items-center space-x-4">
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <User className="text-gray-600 hover:text-blue-500 cursor-pointer" size={24} />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
            <Link href="/account" className="block px-4 py-2 text-black hover:bg-gray-200">
              My Account
            </Link>
            <button
              onClick={() => {
                logout();
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
        {/* <Menu className="text-gray-600 hover:text-blue-500 cursor-pointer" size={24} /> */}
      </div>
    </nav>
  );
};

export default Navbar;
