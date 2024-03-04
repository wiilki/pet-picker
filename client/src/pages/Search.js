import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';
import AnimalTypeSelector from '../components/AnimalTypeSelector';
import BackToTop from '../components/BackToTop';

const Search = () => {
  const { displayedPets, savedPetIds, handleAnimalType, handleSavePet, handleDeletePet, handleLoadMore } = usePets();

  const handleSearch = (type, size, age, gender) => {
    handleAnimalType({ type, size, age, gender });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the distance from the bottom of the page
      const scrolledFromTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalPageHeight = document.documentElement.scrollHeight;

      // Define how close to the bottom you want to trigger the load more function (e.g., within 300px of the bottom)
      const triggerHeight = 300;

      if (scrolledFromTop + viewportHeight + triggerHeight >= totalPageHeight) {
        handleLoadMore();
      }
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
          {displayedPets.map((pet) => (
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
