import React, { useState, useEffect } from "react";

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
      <div>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={searchQuery.type}
          onChange={handleSelectChange}
        >
          <option value="">Select type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          <option value="small-furry">Small & Furry</option>
          <option value="bird">Bird</option>
          <option value="scales-fins-other">Scales, Fins & Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="breed">Breed:</label>
        <select
          id="breed"
          name="breed"
          value={searchQuery.breed}
          onChange={handleSelectChange}
          disabled={!searchQuery.type}
        >
          <option value="">Select breed</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.name}>
              {breed.name}
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
          onChange={handleSelectChange}
        >
          <option value="">Select age</option>
          <option value="Baby">Baby</option>
          <option value="Young">Young</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={searchQuery.gender}
          onChange={handleSelectChange}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          name="location"
          value
          ={searchQuery.location}
          onChange={handleSelectChange}
        >
          <option value="">Select location</option>
          <option value="San Francisco, CA">San Francisco, CA</option>
          <option value="New York, NY">New York, NY</option>
          <option value="Los Angeles, CA">Los Angeles, CA</option>
          <option value="Chicago, IL">Chicago, IL</option>
          <option value="Houston, TX">Houston, TX</option>
          <option value="Philadelphia, PA">Philadelphia, PA</option>
          <option value="Phoenix, AZ">Phoenix, AZ</option>
          <option value="San Antonio, TX">San Antonio, TX</option>
          <option value="San Diego, CA">San Diego, CA</option>
          <option value="Dallas, TX">Dallas, TX</option>
        </select>
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;