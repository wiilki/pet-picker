import React, { useState } from "react";
import PetMenu from "../components/PetMenu";
import SearchForm from "../components/SearchForm";
import petfinder from "../utils/petfinder";

const Search = () => {
  const [pets, setPets] = useState([]);

  const handleSearch = searchOptions => {
    petfinder.search(searchOptions).then(data => {
      setPets(data.animals);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      <PetMenu pets={pets} />
    </div>
  );
};

export default Search;
