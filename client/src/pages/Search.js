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
      <SearchForm />
    </div>
  );
};

export default Search;
