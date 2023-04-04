import React from 'react';
import PetCard from '../PetCard';
import './index.css';

const PetMenu = ({ pets }) => {
  const limitedPets = pets.slice(0, 50); // create a new array with the first 50 pets
  return (
    <div className="pet-menu">
      {limitedPets.map(pet => (
        <PetCard
          key={pet.id}
          name={pet.name}
          breed={pet.breeds.primary}
          age={pet.age}
          gender={pet.gender}
          location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
          image={pet.photos.length > 0 ? pet.photos[0].medium : ''}
        />
      ))}
    </div>
  );
};

export default PetMenu;