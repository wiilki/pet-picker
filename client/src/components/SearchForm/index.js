import React, { useState, useEffect } from 'react';
import petfinder from '../../utils/petfinder';
import './index.css';

const SearchForm = ({ onSubmit }) => {
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    petfinder.getToken().then(token => {
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const url = `https://api.petfinder.com/v2/types/dog/breeds`;
      fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
          setBreeds(data.breeds.map(breed => breed.name));
        })
        .catch(error => {
          console.error(error);
        });
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const searchOptions = {
      type, breed, age, gender, location
    };
    petfinder.search(searchOptions).then(data => {
      onSubmit(data.animals);
    }).catch(error => {
      console.error(error);
    });
  };


  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-label">
        Type:
        <select className="search-select" value={type} onChange={e => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
        </select>
      </label>
      <label className="search-label">
        Breed:
        <select className="search-select" value={breed} onChange={e => setBreed(e.target.value)}>
          <option value="">Select Breed</option>
          {breeds.map(breed => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </label>
      <label className="search-label">
        Age Range:
        <select className="search-select" value={age} onChange={e => setAge(e.target.value)}>
          <option value="">Select Age Range</option>
          <option value="baby">Baby</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
      </label>
      <label className="search-label">
        Gender:
        <select className="search-select" value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label className="search-label">
        Location:
        <input
          type="text"
          className="search-input"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter a location"
        />
      </label>
      <button className="search-button" type="submit">Search</button>
    </form>
  );
};

export default SearchForm;