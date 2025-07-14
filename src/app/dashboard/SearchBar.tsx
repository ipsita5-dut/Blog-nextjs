"use client";
import React from "react";
import { Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  return (
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-64">
      <Search className="text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        className="bg-transparent outline-none pl-2 w-full"
      />
    </div>
  );
};
