import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="bg-[#262A2B] w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="text-center pb-5">
        <div className="relative flex flex-col items-center">
          {/* Search Input */}
          <input
            type="text"
            name="question"
            id="question"
            autoComplete="off"
            autoFocus="on"
            placeholder={query || ""}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-none w-11/12 text-center caret-[#ffb0ac] font-bold text-xl text-[#ffb0ac] p-2 focus:outline-none"
          />
          {/* Underline */}
          <div className="w-11/12 h-[2px] bg-[#858585] mt-1"></div>

          {/* Search Button */}
          <button type="submit" className="absolute right-6 top-1/2 transform -translate-y-1/2">
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
