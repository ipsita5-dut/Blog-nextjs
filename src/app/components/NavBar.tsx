"use client";

import { useState, useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

const links = ["Home", "Blog", "Social", "About", "Contact"];


export default function NavBar() {
    const auth = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 if (!auth) return null;
  const { isAuthenticated, logout } = auth;
  return (
    <nav className="absolute top-0 left-0 w-full bg-opacity-90 z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-8">
        {/* Animated Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {links.map((link, index) => (
            <motion.div
              key={link}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Link
                href={link === "Blog" ? "/dashboard" : `/${link.toLowerCase()}`}
                className="text-lg font-medium text-white hover:text-gray-400 transition"
              >
                {link}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="px-4 py-2 border border-white rounded-lg text-white hover:bg-gray-700 transition">
                ☰
              </button>
              {dropdownOpen && (
                <div className="absolute right-10 mt-2 w-40 bg-white shadow-lg rounded-lg">
                  <Link href="/account" className="block px-4 py-2 text-black hover:bg-gray-200">My Account</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">Logout</button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 border border-white rounded-lg text-white hover:bg-gray-700 transition">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4">
          {links.map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} className="text-lg font-medium text-white hover:text-gray-400 transition" onClick={() => setMenuOpen(false)}>
              {link}
            </Link>
          ))}
          {/* Mobile Auth Buttons */}
          {isAuthenticated ? (
            <button onClick={logout} className="px-4 py-2 border border-white rounded-lg text-white hover:bg-gray-700 transition">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 border border-white rounded-lg text-white hover:bg-gray-700 transition">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
