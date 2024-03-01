import React from 'react';
import { Button } from 'react-bootstrap';
import dogsImage from '../images/dogs.jpg';
import catsImage from '../images/cats.jpg';
import rabbitsImage from '../images/rabbits.jpg';

const AnimalTypeSelector = ({ handleAnimalType }) => (
  <div className="d-flex justify-content-center mb-3">
    <Button onClick={() => handleAnimalType('dog')} variant="primary" size="lg" className="mx-2">
      <img src={dogsImage} alt="Dog" style={{ maxWidth: '100px', maxHeight: '100px' }} /> Dog
    </Button>
    <Button onClick={() => handleAnimalType('cat')} variant="primary" size="lg" className="mx-2">
      <img src={catsImage} alt="Cat" style={{ maxWidth: '100px', maxHeight: '100px' }} /> Cat
    </Button>
    <Button onClick={() => handleAnimalType('rabbit')} variant="primary" size="lg" className="mx-2">
      <img src={rabbitsImage} alt="Rabbit" style={{ maxWidth: '100px', maxHeight: '100px' }} /> Rabbit
    </Button>
  </div>
);

export default AnimalTypeSelector;
