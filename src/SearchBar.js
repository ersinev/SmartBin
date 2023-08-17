import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-input">
      <h2>Search Data</h2>
      <input
      className="input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
