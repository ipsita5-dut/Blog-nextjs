// "use client";

// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section 
//       className="relative h-screen flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/Bg.webp')" }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Content */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }} // Delayed to allow NavBar animations first
//         className="relative z-10"
//       >
//         <h1 className="text-6xl font-extrabold flex">
//           {"Versify".split(" ").map((word, wordIndex) => (
//             <span key={wordIndex} className="mr-2">
//               {word.split("").map((letter, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{ opacity: 0, y: 50, scaleY: 0.5 }}
//                   animate={{ opacity: 1, y: 0, scaleY: 1 }}
//                   transition={{ delay: 1.5 + index * 0.1, duration: 0.5, ease: "easeOut" }} // Further delay
//                   className="inline-block"
//                 >
//                   {letter}
//                 </motion.span>
//               ))}
//             </span>
//           ))}
//         </h1>
//         <motion.p 
//           className="text-xl mt-4"
//           initial={{ opacity: 0, x: -100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }} // Further delay for tagline
//         >
//           Your writing, resonating across the web.
//         </motion.p>
//       </motion.div>
//     </section>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { FaPenNib } from "react-icons/fa";

export default function Hero() {
  return (
    <section 
      className="relative h-screen flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Bg.webp')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }} // Delayed to allow NavBar animations first
        className="relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
          className="text-5xl text-blue-400 mb-4"
        >
          <FaPenNib />
        </motion.div>
        
        <h1 className="text-6xl font-extrabold flex">
          {"Versify".split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="mr-2">
              {word.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, scaleY: 0.5 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.5, ease: "easeOut" }} // Further delay
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>
        <motion.p 
          className="text-xl mt-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }} // Further delay for tagline
        >
          Your writing, resonating across the web.
        </motion.p>
      </motion.div>
    </section>
  );
}
