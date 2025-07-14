// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';

// const About = () => {
//   return (
//     <section className="py-16 px-6 md:px-20 bg-gray-50 text-gray-900">
//       {/* Section Title */}
//       <motion.h2
//         className="text-4xl font-bold text-center mb-10"
//         initial={{ opacity: 0, y: -50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//       >
//         About Versify
//       </motion.h2>

//       {/* Content Wrapper */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-10">
//         {/* Text Section */}
//         <motion.div
//           className="w-full md:w-1/2"
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           <p className="text-lg text-gray-700 leading-relaxed">
//             Welcome to <span className="font-semibold text-blue-600">Versify</span>, a platform where creativity meets community.
//             Whether you're a blogger sharing insights or a social butterfly connecting with like-minded individuals,
//             Versify is your space to express, engage, and explore.
//           </p>
//           <p className="mt-4 text-lg text-gray-700 leading-relaxed">
//             Our mission is to empower voices across the digital landscape by blending
//             the essence of blogging with the dynamism of social media.
//           </p>
//         </motion.div>

//         {/* Image Section */}
//         <motion.div
//           className="w-full md:w-1/2 flex justify-center"
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           viewport={{ once: true }}
//         >
//           <div className="relative w-80 h-80 md:w-96 md:h-96">
//             <Image
//               src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//               alt="About Versify"
//               fill
//               className="rounded-lg object-cover shadow-lg"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default About;


'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50 text-gray-900">
      {/* Section Title */}
      <motion.h2
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        About Versify
      </motion.h2>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">Versify</span>, a platform where creativity meets community.
            Whether you're a blogger sharing insights or a social butterfly connecting with like-minded individuals,
            Versify is your space to express, engage, and explore.
          </p>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Our mission is to empower voices across the digital landscape by blending
            the essence of blogging with the dynamism of social media.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <Image
              src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="About Versify"
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
