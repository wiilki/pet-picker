import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../utils/petfinder";

const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState({
    type: "",
    breed: "",
    age: "",
    gender: "",
    location: "",
  });
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await fetch(
          `https://api.petfinder.com/v2/types/${searchQuery.type}/breeds`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const { breeds } = await response.json();
        setBreeds(breeds);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchQuery.type) {
      fetchBreeds();
    }
  }, [searchQuery.type]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form inputs and submit button */}
    </form>
  );
};

export default SearchForm;
