import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';
import AnimalTypeSelector from '../components/AnimalTypeSelector';

const Search = () => {
  const { searchedPets, savedPetIds, handleAnimalType, handleSavePet } = usePets();

  const handleSearch = (type, size, age, gender) => {
    handleAnimalType({ species: type, size, age, gender });
  };
 
  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <AnimalTypeSelector handleSearch={handleSearch} />
        </Container>
      </div>
      <Container>
        <Row>
          {searchedPets.map((pet) => (
            <PetCard
              key={pet.petId}
              pet={pet}
              savedPetIds={savedPetIds}
              handleSavePet={handleSavePet}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Search;
