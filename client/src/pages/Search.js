import React, { useState } from "react";
import SearchForm from "../components/SearchForm";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchQuery) => {
    // Implement search logic here. Call a function that retrieves search results based on the search query
    console.log(searchQuery);
  };

  return (
    <div>
      <h1>Search for pets</h1>
      <SearchForm onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
