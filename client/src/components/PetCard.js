import React, { useState } from 'react';
import { Col, Card, Modal } from 'react-bootstrap';
import PetDetailsCard from './PetDetailsCard';
import '../styles/petcard.css';

const PetCard = ({ pet, savedPetIds, handleSavePet, handleDeletePet, isFavorite }) => { // Add handleDeletePet to the props
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Col md="4" onClick={handleCardClick} style={{ cursor: 'pointer' }} className='petcard-container'>
        <Card key={pet.petId} border="dark" className='mb-3 pet-card'>
          {pet.image ? (
            <Card.Img
              src={pet.image}
              alt={`Photo of ${pet.name}`}
              variant="top"
              className="pet-image" // Add this class
            />
          ) : null}
          <Card.Body>
            <Card.Title>{pet.name}</Card.Title>
            <p className="small">Age: {pet.age}</p>
            <p className="small">Gender: {pet.gender}</p>
            <p className="small">Size: {pet.size}</p>
            <Card.Text>{pet.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Modal show={showModal} onHide={handleCloseModal}>
        <PetDetailsCard
          pet={pet}
          savedPetIds={savedPetIds}
          handleSavePet={handleSavePet}
          handleDeletePet={handleDeletePet}
          handleCloseModal={handleCloseModal}
          isFavorite={isFavorite}// Set based on the pet's saved status
        />
      </Modal>
    </>
  );
};

export default PetCard;
