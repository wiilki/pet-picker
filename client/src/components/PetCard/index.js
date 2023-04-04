import React from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import { ADD_TO_FAVORITES } from '../../utils/actions';

const PetCard = ({ id, name, breed, age, gender, location, image }) => {
  const dispatch = useDispatch();

  const handleSaveToFavorites = () => {
    const newFavoritePet = {
      id,
      name,
      breed,
      age,
      gender,
      location,
      image
    };
    dispatch({
      type: ADD_TO_FAVORITES,
      pet: newFavoritePet
    });
  };

  return (
    <div className="pet-card">
      <div className="card-header">
        <h2>{name}</h2>
    
      </div>
      <div className="card-body">
        <img src={image} alt={name} className="pet-image" />
        <ul className="pet-details">
          {breed && (
            <li>
              <strong>Breed:</strong> {breed}
            </li>
          )}
          <li>
            <strong>Age:</strong> {age}
          </li>
          <li>
            <strong>Gender:</strong> {gender}
          </li>
          <li>
            <strong>Location:</strong> {location}
          </li>
        </ul>
        <button className="favorite-button" onClick={handleSaveToFavorites}>
          Save to Favorites
        </button>
      </div>
    </div>
  );
};

export default PetCard;
