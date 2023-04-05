import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PET } from '../utils/mutations';
import { removePetId } from '../utils/localStorage';

import Auth from '../utils/auth';

const Favorites = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removePet] = useMutation(REMOVE_PET);

  const userData = data?.me || {};

  // create function that accepts the pet's mongo _id value as param and deletes the pet from the database
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
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s pets!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.favorites?.length
            ? `Viewing ${userData.favorites.length} saved ${userData.favorites.length === 1 ? 'pet' : 'pets'
            }:`
            : 'You have no saved pets!'}
        </h2>
        <div>
          <Row>
            {userData.favorites?.map((pet) => {
              return (
                <Col md="4">
                  <Card key={pet.petId} border="dark">
                    {pet.image ? (
                      <Card.Img
                        src={pet.image}
                        alt={`The picture of ${pet.name}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{pet.name}</Card.Title>
                      <p className="small">Age: {pet.age}</p>
                      <Card.Text>{pet.description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeletePet(pet.petId)}
                      >
                        Delete this Pet!
                      </Button>
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
