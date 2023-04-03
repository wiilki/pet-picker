import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState({
    type: "",
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

  const ageRanges = [
    "Baby",
    "Young",
    "Adult",
    "Senior",
  ];

  const petTypes = [
    "Dog",
    "Cat",
    "Bird",
    "Rabbit",
    "Small & Furry",
    "Horse",
    "Reptile",
    "Barnyard",
  ];

  const genders = ["Male", "Female", "Unknown"];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={searchQuery.type}
          onChange={handleInputChange}
        >
          <option value="">Select Pet Type</option>
          {petTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <select
          id="age"
          name="age"
          value={searchQuery.age}
          onChange={handleInputChange}
        >
          <option value="">Select Age Range</option>
          {ageRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={searchQuery.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
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

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
