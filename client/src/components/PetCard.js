import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/petcard.css';

const PetCard = ({ pet }) => {

  return (
    <>
      <Card border="dark" className='container'>
        {pet.image && (
          <Card.Img src={pet.image} alt={`Photo of ${pet.name}`} variant="top" className='pet-image' />
        )}
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <p className="small">Age: {pet.age}</p>
          <p className="small">Gender: {pet.gender}</p>
          <p className="small">Size: {pet.size}</p>
          <Card.Text>{pet.description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default PetCard;
