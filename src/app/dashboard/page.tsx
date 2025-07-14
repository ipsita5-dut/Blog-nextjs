import React from "react";
import Navbar from "./mainNav";
import CreatePost from "./CreatePost";
import Feed from "./Feed";
import Link from "next/link";

// import BlogPost from "./BlogPost";
// import BlogFeed from "./BlogFeed";


const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="pt-20 max-w-4xl mx-auto">
 <Link href="/new-post">
          <div className="border border-gray-300 p-4 rounded-lg cursor-pointer text-gray-500 hover:shadow transition">
            <p className="italic text-blue-500">What's on your mind?</p>
          </div>
        </Link> 
                <CreatePost />
      
         <Feed />

         {/* Blog Writing Section */}
         {/* <BlogPost /> */}
        {/* <BlogFeed /> */}
      </div>
    </div>
  );
};

export default Dashboard;
