"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid"; 

const Contact = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-100 text-gray-900">
      {/* Section Title */}
      <div className="flex items-center justify-center mb-10">
        <motion.h2
          className="text-5xl font-bold text-center mr-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>
        <Link href="/">
          <HomeIcon className="w-10 h-10 text-blue-600 cursor-pointer hover:text-blue-800" />
        </Link>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input type="text" className="w-full p-3 border rounded-md" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input type="email" className="w-full p-3 border rounded-md" placeholder="Your Email" />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Message</label>
            <textarea className="w-full p-3 border rounded-md" rows={4} placeholder="Your Message"></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
