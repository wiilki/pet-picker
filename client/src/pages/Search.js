import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';
import AnimalTypeSelector from '../components/AnimalTypeSelector';
import BackToTop from '../components/BackToTop';
import '../styles/search-page.css'

const Search = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const { displayedPets, savedPetIds, handleAnimalType, handleSavePet, handleDeletePet, handleLoadMore, loading } = usePets();
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (type, size, age, gender, location) => {
    setSearchLocation(location);
    setSearchPerformed(true);
    handleAnimalType({ type, size, age, gender, location });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolledFromTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalPageHeight = document.documentElement.scrollHeight;

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
      <div>
        <div className='search-header'>
          {loading && searchPerformed ? (
            <h2>Loading...</h2>
          ) : searchPerformed ? (
            displayedPets.length > 0 ? (
              <h2>Pets within 100 miles of {searchLocation}</h2>
            ) : (
              <h2>No Results Found</h2>
            )
          ) : null}
        </div>
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
