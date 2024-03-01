import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { usePets } from '../hooks/usePets';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PET } from '../utils/mutations';
import { removePetId } from '../utils/localStorage';
import Auth from '../utils/auth';
import PetCard from '../components/PetCard';
import '../styles/petcard.css';

const Favorites = () => {
  const { handleSavePet, savedPetIds } = usePets();
  const { loading, data } = useQuery(QUERY_ME);
  const [removePet] = useMutation(REMOVE_PET);

  const userData = data?.me || {};

  const handleDeletePet = async (petId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removePet({
        variables: { petId },
      });

      // Upon success, remove pet's id from localStorage
      removePetId(petId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
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
            <Col md="4" key={pet.petId}>
              {/* Render PetCard component */}
              <PetCard
                pet={pet}
                savedPetIds={savedPetIds}
                handleSavePet={() => handleSavePet(pet.petId)}
              />
              {/* Render "Remove" button below the PetCard */}
              <Button variant="danger" className="mt-2" onClick={() => handleDeletePet(pet.petId)}>
                Remove
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Favorites;
