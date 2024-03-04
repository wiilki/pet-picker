import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';
import AnimalTypeSelector from '../components/AnimalTypeSelector';
import BackToTop from '../components/BackToTop';

const Search = () => {
  const [searchLocation, setSearchLocation] = useState(''); // Track location state
  const { displayedPets, savedPetIds, handleAnimalType, handleSavePet, handleDeletePet, handleLoadMore } = usePets();

  const handleSearch = (type, size, age, gender, location) => {
    setSearchLocation(location); // Update location state on search
    handleAnimalType({ type, size, age, gender, location });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the distance from the bottom of the page
      const scrolledFromTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalPageHeight = document.documentElement.scrollHeight;

      // Define how close to the bottom you want to trigger the load more function
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
        {/* Conditionally render the <h2> element */}
        {displayedPets.length > 0 && searchLocation && (
          <h2> Pets within 100 miles of {searchLocation}</h2>
        )}
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
