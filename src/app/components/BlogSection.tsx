// // 'use client';

// // import { useState, useEffect } from 'react';
// // import Image from 'next/image';
// // import { motion } from 'framer-motion';

// // const images = [
// //   'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
// //   'https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg',
// //   'https://media.istockphoto.com/id/1477183258/photo/woman-holding-ai-icons-with-laptop.jpg?s=1024x1024&w=is&k=20&c=k3DlRGGOL93m-81KFowGBcW2LzYYEDtBU7-MaH6s6ls=',
// // ];

// // const BlogSection = () => {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
// //     }, 3000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <section className="flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-20 bg-gray-50">
// //       {/* Image Slider */}
// //       <div className="w-full md:w-1/2 flex justify-center items-center relative h-72 md:h-96">
// //         {images.map((src, index) => (
// //           <motion.div
// //             key={index}
// //             className={`absolute w-full h-full transition-opacity duration-1000 ${
// //               index === currentIndex ? 'opacity-100' : 'opacity-0'
// //             }`}
// //           >
// //             <Image src={src} alt="Blogging" fill className="rounded-lg object-cover" />
// //           </motion.div>
// //         ))}
// //       </div>
      
// //       {/* Blog Info */}
// //       <div className="w-full md:w-1/2 text-gray-800 text-center md:text-left mt-10 md:pl-10">
// //         <h2 className="text-3xl font-bold mb-4">Why Start Blogging?</h2>
// //         <p className="text-lg text-gray-600">
// //           Blogging is a powerful way to share your thoughts, knowledge, and experiences with the world.
// //           It helps you establish authority, build connections, and even monetize your content.
// //           Whether you're writing about personal experiences or professional insights, blogging can make a difference!
// //         </p>
// //       </div>
// //     </section>
// //   );
// // };

// // export default BlogSection;


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { motion, useInView } from 'framer-motion';

// const images = [
//   'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//   'https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg',
//   'https://media.istockphoto.com/id/1477183258/photo/woman-holding-ai-icons-with-laptop.jpg?s=1024x1024&w=is&k=20&c=k3DlRGGOL93m-81KFowGBcW2LzYYEDtBU7-MaH6s6ls=',
// ];

// const BlogSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { triggerOnce: false, margin: '-100px 0px' });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       ref={ref}
//       className="flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-20 bg-gray-50 overflow-hidden"
//     >
//       {/* Image Slider */}
//       <motion.div
//         className="w-full md:w-1/2 flex justify-center items-center relative h-72 md:h-96"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//       >
//         {images.map((src, index) => (
//           <motion.div
//             key={index}
//             className={`absolute w-full h-full transition-opacity duration-1000 ${
//               index === currentIndex ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <Image src={src} alt="Blogging" fill className="rounded-lg object-cover shadow-lg" />
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Blog Info */}
//       <motion.div
//         className="w-full md:w-1/2 text-gray-800 text-center md:text-left mt-10 md:pl-10"
//         initial={{ opacity: 0, x: 50 }}
//         animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//       >
//         <h2 className="text-3xl font-bold mb-4">Why Start Blogging?</h2>
//         <p className="text-lg text-gray-600">
//           Blogging is a powerful way to share your thoughts, knowledge, and experiences with the world.
//           It helps you establish authority, build connections, and even monetize your content.
//           Whether you're writing about personal experiences or professional insights, blogging can make a difference!
//         </p>
//       </motion.div>
//     </section>
//   );
// };

// export default BlogSection;


'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const images = [
  'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop',
];

const BlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Image Background Carousel */}
      {images.map((src, i) => (
        <motion.div
          key={i}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            i === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={src} alt="Blog Slide" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      ))}

      {/* Overlay Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 md:px-20 text-white"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-xl">
          Why Start Blogging?
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-6">
          Your voice matters. Whether you're journaling life stories or writing thought leadership,
          blogging lets you build an authentic legacy in the digital world.
        </p>
        <button className="bg-white text-purple-700 px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-100 transition">
          Start Writing →
        </button>
      </motion.div>
    </section>
  );
};

export default BlogSection;

