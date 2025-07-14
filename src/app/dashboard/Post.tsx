import React from "react";

interface PostProps {
  user: string;
  content: string;
}

const Post: React.FC<PostProps> = ({ user, content }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h3 className="font-bold">{user}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Post;
