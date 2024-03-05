import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';
import BackToTop from '../components/BackToTop';
import { savePetIds } from '../utils/localStorage';
import '../styles/petcard.css'

const Favorites = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const { handleSavePet, handleDeletePet, savedPetIds } = usePets();

  useEffect(() => {
    // When data is loaded and not undefined, update local storage
    if (data?.me?.savedPets) {
      const petIds = data.me.savedPets.map(pet => pet.petId);
      savePetIds(petIds); // Update local storage to reflect GraphQL data
    }
  }, [data]);

  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>{userData.username}'s pets!</h1>
        </Container>
      </div>

      <div className='display-search-container'>
        <Row>
          {userData.savedPets?.map((pet) => (
            <PetCard
              key={pet.petId}
              pet={pet}
              savedPetIds={savedPetIds}
              handleSavePet={handleSavePet}
              handleDeletePet={handleDeletePet}
              isFavorite={true}
            />

          ))}
        </Row>
      </div>
      <BackToTop />
    </>
  );
};

export default Favorites;
