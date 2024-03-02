import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const AnimalTypeSelector = ({ handleSearch }) => {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSearchClick = () => {
    handleSearch(type, size, age, gender);
  };

  return (
    <div className="d-flex justify-content-center mb-3">
      <Dropdown className="mx-2">
        <Dropdown.Toggle variant="primary" size="lg">
          Type: {type || 'Any'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setType('')}>Any</Dropdown.Item>
          <Dropdown.Item onClick={() => setType('Dog')}>Dog</Dropdown.Item>
          <Dropdown.Item onClick={() => setType('Cat')}>Cat</Dropdown.Item>
          <Dropdown.Item onClick={() => setType('Rabbit')}>Rabbit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="mx-2">
        <Dropdown.Toggle variant="primary" size="lg">
          Size: {size || 'Any'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSize('')}>Any</Dropdown.Item>
          <Dropdown.Item onClick={() => setSize('Small')}>Small</Dropdown.Item>
          <Dropdown.Item onClick={() => setSize('Medium')}>Medium</Dropdown.Item>
          <Dropdown.Item onClick={() => setSize('Large')}>Large</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="mx-2">
        <Dropdown.Toggle variant="primary" size="lg">
          Age: {age || 'Any'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setAge('')}>Any</Dropdown.Item>
          <Dropdown.Item onClick={() => setAge('Baby')}>Baby</Dropdown.Item>
          <Dropdown.Item onClick={() => setAge('Young')}>Young</Dropdown.Item>
          <Dropdown.Item onClick={() => setAge('Adult')}>Adult</Dropdown.Item>
          <Dropdown.Item onClick={() => setAge('Senior')}>Senior</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="mx-2">
        <Dropdown.Toggle variant="primary" size="lg">
          Gender: {gender || 'Any'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setGender('')}>Any</Dropdown.Item>
          <Dropdown.Item onClick={() => setGender('Male')}>Male</Dropdown.Item>
          <Dropdown.Item onClick={() => setGender('Female')}>Female</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button onClick={handleSearchClick} variant="primary" size="lg" className="mx-2">
        Search
      </Button>
    </div>
  );
};

export default AnimalTypeSelector;
