import React, { useState } from "react";
import PetMenu from "../components/PetMenu";
import SearchForm from "../components/SearchForm";
import petfinder from "../utils/petfinder";
import { useDispatch } from "react-redux";
import { ADD_TO_FAVORITES } from "../utils/actions";

const Search = () => {
  const [pets, setPets] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (searchOptions) => {
    petfinder
      .search(searchOptions)
      .then((data) => {
        setPets(data.animals);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddToFavorites = (pet) => {
    dispatch({ type: ADD_TO_FAVORITES, pet });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      <PetMenu pets={pets} onAddToFavorites={handleAddToFavorites} />
    </div>
  );
};

export default Search;
