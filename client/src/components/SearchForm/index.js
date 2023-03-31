import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState({
    type: "",
    breed: "",
    age: "",
    gender: "",
    location: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={searchQuery.type}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="breed">Breed:</label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={searchQuery.breed}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={searchQuery.age}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={searchQuery.gender}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={searchQuery.location}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
