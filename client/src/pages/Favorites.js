import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PET } from '../utils/mutations';
import { removePetId } from '../utils/localStorage';

import Auth from '../utils/auth';

const Favorites = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removePet] = useMutation(REMOVE_PET);

  const userData = data?.me || {};

  const handleDeletePet = async (petId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removePet({
        variables: { petId },
      });

      // upon success, remove pet's id from localStorage
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
        <div>
          <Row>
            {userData.savedPets?.map((pet) => {
              return (
                <Col md="4" key={pet.petId}>
                  <Card>
                    <Card.Img variant="top" src={pet.image} alt={`Photo of ${pet.name}`} />
                    <Card.Body>
                      <Card.Title>{pet.name}</Card.Title>
                      <p className="small">Age: {pet.age}</p>
                      <p className="small">Gender: {pet.gender}</p>
                      <p className="small">Size: {pet.size}</p>
                      <Card.Text>{pet.description}</Card.Text>
                      <Button variant="primary" onClick={() => handleDeletePet(pet.petId)}>Remove</Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Favorites;
