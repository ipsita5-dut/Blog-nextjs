// // "use client";

// // import { motion } from "framer-motion";
// // import Image from "next/image";

// // const About = () => {
// //   return (
// //     <section className="py-16 px-6 md:px-20 bg-gray-50 text-gray-900">
// //       {/* Section Title */}
// //       <motion.h2
// //         className="text-5xl font-bold text-center mb-10"
// //         initial={{ opacity: 0, y: -50 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //       >
// //         About Versify
// //       </motion.h2>

// //       {/* Content Wrapper */}
// //       <div className="flex flex-col md:flex-row items-center justify-between gap-10">
// //         {/* Text Section */}
// //         <motion.div
// //           className="w-full md:w-1/2"
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.6, delay: 0.2 }}
// //         >
// //           <p className="text-lg text-gray-700 leading-relaxed">
// //             Welcome to <span className="font-semibold text-blue-600">Versify</span>, a platform where creativity meets community.
// //             Whether you're a blogger sharing insights or a social butterfly connecting with like-minded individuals,
// //             Versify is your space to express, engage, and explore.
// //           </p>
// //           <p className="mt-4 text-lg text-gray-700 leading-relaxed">
// //             Our mission is to empower voices across the digital landscape by blending
// //             the essence of blogging with the dynamism of social media.
// //           </p>
// //         </motion.div>

// //         {/* Image Section */}
// //         <motion.div
// //           className="w-full md:w-1/2 flex justify-center"
// //           initial={{ opacity: 0, x: 50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.6, delay: 0.4 }}
// //         >
// //           <div className="relative w-80 h-80 md:w-96 md:h-96">
// //             <Image
// //               src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
// //               alt="About Versify"
// //               fill
// //               className="rounded-lg object-cover shadow-lg"
// //             />
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Why Choose Versify? */}
// //       <motion.div
// //         className="mt-16 text-center"
// //         initial={{ opacity: 0, y: 50 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6, delay: 0.6 }}
// //       >
// //         <h3 className="text-3xl font-semibold mb-6">Why Choose Versify?</h3>
// //         <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
// //           - Seamless integration of blogging and social networking.<br />
// //           - A supportive community to share ideas and engage with others.<br />
// //           - A beautiful and intuitive interface designed for writers and creators.<br />
// //           - Stay connected and inspired with a blend of personal expression and interaction.
// //         </p>
// //       </motion.div>
// //     </section>
// //   );
// // };

// // export default About;


// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// const About = () => {
//   return (
//     <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-blue-50 to-blue-100 text-gray-900">
//       {/* Section Title */}
//       <motion.h2
//         className="text-5xl font-bold text-center mb-10 text-blue-900"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         About Versify
//       </motion.h2>

//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//         {/* Image */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <Image
//             src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//             alt="About Versify"
//             width={600}
//             height={400}
//             className="rounded-lg shadow-lg"
//           />
//         </motion.div>

//         {/* Content */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="bg-white p-8 rounded-lg shadow-lg"
//         >
//           <h3 className="text-3xl font-semibold text-blue-800 mb-4">Empowering Voices, Connecting Minds</h3>
//           <p className="text-lg text-gray-700 mb-4">
//             Versify is a dynamic platform that seamlessly blends social media and blogging, allowing users to share their thoughts, stories, and ideas with the world.
//           </p>
//           <p className="text-lg text-gray-700 mb-4">
//             Our mission is to create a space where creativity thrives, opinions matter, and voices are heard. Whether you want to write in-depth blogs or engage with a community, Versify is here for you.
//           </p>
//           <p className="text-lg text-gray-700 font-semibold">Join us and be part of the conversation.</p>
//         </motion.div>
//       </div>
//        {/* Why Choose Versify? */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           className="bg-white p-8 rounded-lg shadow-lg"
//         >
//           <h3 className="text-3xl font-semibold mb-6">Why Choose Versify?</h3>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             - Seamless integration of blogging and social networking.<br />
//             - A supportive community to share ideas and engage with others.<br />
//             - A beautiful and intuitive interface designed for writers and creators.<br />
//             - Stay connected and inspired with a blend of personal expression and interaction.
//           </p>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.8 }}
//         >
//           <Image
//             src="https://img.freepik.com/free-photo/why-choose-us-question-with-paper-lightbulb_23-2148932317.jpg?t=st=1742842663~exp=1742846263~hmac=92b93cb7b804816b94efda75e6c1ce46e9d256fc2a1f4e73cd811a42f4c9af9f&w=1380"
//             alt="Why Choose Versify"
//             width={500}
//             height={300}
//             className="rounded-lg shadow-md"
//           />
//         </motion.div>
//       </div>
//     </section>

    
//   );
// };

// export default About;


"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid"; 

const About = () => {
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
          About Versify
        </motion.h2>
        <Link href="/">
          <HomeIcon className="w-10 h-10 text-blue-600 cursor-pointer hover:text-blue-800" />
        </Link>
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2"
        >
          <Image
            src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="About Versify"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:w-1/2 mt-6 md:mt-0 md:ml-6 text-center md:text-left"
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            Versify is your go-to platform for blogging and social networking.
            Whether you are a writer, storyteller, or content creator, we offer a
            seamless experience that lets your voice be heard.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Versify? */}
      <div className="mt-16 max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h3 className="text-3xl font-semibold mb-6">Why Choose Versify?</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            - Seamless integration of blogging and social networking.<br />
            - A supportive community to share ideas and engage with others.<br />
            - A beautiful and intuitive interface designed for writers and creators.<br />
            - Stay connected and inspired with a blend of personal expression and interaction.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="md:w-1/2 mt-6 md:mt-0 md:ml-6"
        >
          <Image
            src="https://img.freepik.com/free-photo/why-choose-us-question-with-paper-lightbulb_23-2148932317.jpg?t=st=1742842663~exp=1742846263~hmac=92b93cb7b804816b94efda75e6c1ce46e9d256fc2a1f4e73cd811a42f4c9af9f&w=1380"
            alt="Why Choose Versify"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
