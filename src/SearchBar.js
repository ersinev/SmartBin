import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
