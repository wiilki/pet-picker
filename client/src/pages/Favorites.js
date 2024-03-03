import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import PetCard from '../components/PetCard';
import { usePets } from '../hooks/usePets';

const Favorites = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const { savedPetIds, handleSavePet, handleDeletePet } = usePets();

  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s pets!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedPets?.length
            ? `Viewing ${userData.savedPets.length} saved ${userData.savedPets.length === 1 ? 'pet' : 'pets'}:`
            : 'You have no saved pets!'}
        </h2>
        <Row>
          {userData.savedPets?.map((pet) => (
            <PetCard
              key={pet.petId}
              pet={pet}
              savedPetIds={savedPetIds}
              handleSavePet={handleSavePet}
              handleDeletePet={handleDeletePet}
            />

          ))}
        </Row>
      </Container>
    </>
  );
};

export default Favorites;
