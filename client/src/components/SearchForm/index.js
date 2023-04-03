import React, { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ type, age, gender, location });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
        </select>
      </label>
      <label>
        Age Range:
        <select value={age} onChange={e => setAge(e.target.value)}>
          <option value="">Select Age Range</option>
          <option value="baby">Baby</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
      </label>
      <label>
        Gender:
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter a location"
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
