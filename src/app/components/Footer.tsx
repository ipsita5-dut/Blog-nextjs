'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold">Versify</h2>
          <p className="text-gray-400 mt-2">Your hub for blogging & social connection.</p>
        </div>
        
        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
            <li><Link href="/blogs" className="text-gray-400 hover:text-white transition">Blogs</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>
        
        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-5">
        <p>&copy; {new Date().getFullYear()} Versify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
