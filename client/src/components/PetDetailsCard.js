import React from 'react';
import { Col, Button, Card } from 'react-bootstrap';
import Auth from '../utils/auth';

const PetDetailsCard = ({ pet, savedPetIds, handleSavePet, handleCloseModal, handleDeletePet }) => {


  return (
    <Col>
      <Card key={pet.petId} border="dark">
        {pet.image ? (
          <Card.Img
            src={pet.image}
            alt={`Photo of ${pet.name}`}
            variant="top"
          />
        ) : null}
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <p className="small">Age: {pet.age}</p>
          <p className="small">Gender: {pet.gender}</p>
          <p className="small">Size: {pet.size}</p>
          <Card.Text>{pet.description}</Card.Text>
          {Auth.loggedIn() && (
            <Button
              disabled={savedPetIds?.some(
                (savedId) => savedId === pet.petId
              )}
              className="btn-block btn-info"
              onClick={() => handleSavePet(pet.petId)}
            >
              {savedPetIds?.some((savedId) => savedId === pet.petId)
                ? 'SAVED!'
                : 'Save This Pet!'}
            </Button>
          )}
          <Button variant="primary" onClick={() => handleDeletePet(pet.petId)}>Remove</Button>
          <Button className="btn-block" onClick={handleCloseModal}>
            Close Modal
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PetDetailsCard;
