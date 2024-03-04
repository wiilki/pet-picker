import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';
import AnimalTypeSelector from '../components/AnimalTypeSelector';
import BackToTop from '../components/BackToTop';
import { useEffect } from 'react';

const Search = () => {
  const { searchedPets, savedPetIds, handleAnimalType, handleSavePet, handleDeletePet, handleLoadMore } = usePets();

  const handleSearch = (type, size, age, gender) => {
    handleAnimalType({ species: type, size, age, gender });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      handleLoadMore(); // Trigger loading more pets
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore]);

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
      <BackToTop />
    </>
  );
};

export default Search;
