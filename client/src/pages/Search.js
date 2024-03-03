import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';
import AnimalTypeSelector from '../components/AnimalTypeSelector';

const Search = () => {
  const { searchedPets, savedPetIds, handleAnimalType, handleSavePet, handleDeletePet } = usePets();

  const handleSearch = (type, size, age, gender) => {
    handleAnimalType({ species: type, size, age, gender });
  };

  return (
    <>
      <div className="text-light bg-dark p-2">
        <Container>
          <AnimalTypeSelector handleSearch={handleSearch} />
        </Container>
      </div>
      <div className='display-search-container'>
        <Row>
          {searchedPets.map((pet) => (
            <PetCard
              key={pet.petId}
              pet={pet}
              savedPetIds={savedPetIds}
              handleSavePet={handleSavePet}
              handleDeletePet={handleDeletePet}
            />
          ))}
        </Row>
      </div>
    </>
  );
};

export default Search;
