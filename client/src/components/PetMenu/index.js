import React from 'react';
import PetCard from '../PetCard';

const PetMenu = ({ pets }) => {
  if (!pets || pets.length === 0) {
    return <div>No pets found</div>;
  }

  return (
    <div>
      {pets.map(pet => (
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
