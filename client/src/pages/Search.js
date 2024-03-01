import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';
import AnimalTypeSelector from '../components/AnimalTypeSelector';
import Auth from '../utils/auth';

const SearchPets = () => {
  const { displayedPets, handleLoadMore, handleAnimalType, handleSavePet, loading, savedPetIds } = usePets();

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Pets!</h1>
          <AnimalTypeSelector handleAnimalType={handleAnimalType} />
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {displayedPets.length ? `Viewing ${displayedPets.length} results:` : 'Search for a pet to begin'}
        </h2>
        <Row>
          {displayedPets.map((pet) => (
            <Col md={4} key={pet.petId} className="mb-3">
              <PetCard
                pet={pet}
                savedPetIds={savedPetIds}
                handleSavePet={() => handleSavePet(pet.petId)}
              />
              {Auth.loggedIn() && (
                <Button
                  variant="info"
                  className="mt-2 w-100"
                  disabled={savedPetIds.some(savedId => savedId === pet.petId)}
                  onClick={() => handleSavePet(pet.petId)}>
                  {savedPetIds.some(savedId => savedId === pet.petId) ? 'Saved!' : 'Save This Pet'}
                </Button>
              )}
            </Col>
          ))}
        </Row>
        {loading && <p>Loading more pets...</p>}
        {!loading && displayedPets.length > 0 && (
          <Button className="mb-3" onClick={handleLoadMore}>Load More</Button>
        )}
      </Container>
    </>
  );
};

export default SearchPets;
