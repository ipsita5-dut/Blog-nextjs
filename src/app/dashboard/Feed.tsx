// "use client";
// import React, { useState } from "react";
// import Post from "./Post";

// const Feed: React.FC = () => {
//   const [posts, setPosts] = useState([
//     { id: 1, user: "John Doe", content: "Hello world! 🚀" },
//     { id: 2, user: "Jane Smith", content: "My first post here!" },
//   ]);

//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       {posts.map((post) => (
//         <div key={post.id} className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
//           <h3 className="font-bold text-lg text-gray-800">{post.user}</h3>
//           <p className="text-gray-600 mt-2">{post.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feed;


"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star, Eye } from "lucide-react";

const dummyPosts = [
  {
    id: 1,
    title: "JavaScript and React JS Best Practices 2021",
    author: "Mr. Jhone",
    image: "https://img.freepik.com/free-photo/side-shot-code-editor-using-react-js_181624-61842.jpg?ga=GA1.1.105592025.1741941298&semt=ais_hybrid&w=740",
    rating: 4.5,
    views: 5100,
  },
  {
    id: 2,
    title: "PHP OOP JS Best Practices 2020",
    author: "Mr. Jhone",
    image: "https://propeltech.co.uk/media/fbxnrk0m/understanding-php.jpeg?rmode=max&width=1200",
    rating: 4.5,
    views: 5100,
  },
  {
    id: 3,
    title: "Next JS Best Practices + Project",
    author: "Mr. Jhone",
    image: "data:image/png;base64,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",
    rating: 4.5,
    views: 5100,
  },
];

export default function Feed() {
  return (
    <div className="min-h-screen w-full ">
      <div className="w-full  px-6 py-6">
        <h2 className="text-2xl font-bold text-gray-900">Trending Today</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {dummyPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900">{post.title}</h3>
                <div className="flex items-center justify-between mt-2 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500" size={16} />
                    <span>{post.rating}</span>
                    <Eye className="ml-3" size={16} />
                    <span>{post.views}</span>
                  </div>
                </div>
                <div className="mt-3 text-gray-700 font-medium">{post.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
