import React from "react";
import PetMenu from "../components/PetMenu";
import SearchForm from "../components/SearchForm";

const Search = () => {
  return (
    <Fragment>
      <div>
        <SearchForm />
      </div>
      <div>
        <PetMenu />
      </div>
    </Fragment>
  );
};

export default Search;