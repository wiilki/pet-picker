import React, { useState, useRef, useEffect } from 'react';
import { Col, Card, Modal } from 'react-bootstrap';
import PetDetailsCard from './PetDetailsCard';
import '../styles/petcard.css';

const PetCard = ({ pet, savedPetIds, handleSavePet, handleDeletePet, isFavorite }) => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility
  const cardRef = useRef(); // Reference to the card

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the card comes into view, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef.current); // Stop observing once visible
        }
      },
      {
        rootMargin: '100px', // Load a bit before the card comes into viewport
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [cardRef]);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Col
        xl={3}
        lg={4}
        md={6}
        sm={12}
        ref={cardRef} // Attach the ref to the Col component
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
        className='petcard-container'>

        <Card key={pet.petId} border="dark" className='mb-3 pet-card'>
          {/* Use isVisible to conditionally render the image */}
          {isVisible && pet.image ? (
            <Card.Img
              src={pet.image}
              alt={`Photo of ${pet.name}`}
              variant="top"
              className="pet-image"
            />
          ) : null}
          <Card.Body>
            <Card.Title>{pet.name}</Card.Title>
            <p class="small"><strong>Age:</strong> <span>{pet.age}</span></p>
            <p class="small"><strong>Gender:</strong> <span>{pet.gender}</span></p>
            <p class="small"><strong>Size:</strong> <span>{pet.size}</span></p>
            <p class="small"><strong>Location:</strong> <span>{pet.location}</span></p>
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
          isFavorite={isFavorite} // Set based on the pet's saved status
        />
      </Modal>
    </>
  );
};

export default PetCard;
