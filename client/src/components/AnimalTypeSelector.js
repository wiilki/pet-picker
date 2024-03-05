import React, { useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import '../styles/animal-selector.css'

const AnimalTypeSelector = ({ handleSearch }) => {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation ] = useState('');

  const handleSearchClick = () => {
    handleSearch(type, size, age, gender, location);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className='search-bar-container'>
        <Dropdown className="mx-2">
          <Dropdown.Toggle variant="primary" size="sm" className='search-bar-buttons'>
            Type: {type || 'Any'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setType('')}>Any</Dropdown.Item>
            <Dropdown.Item onClick={() => setType('Dog')}>Dog</Dropdown.Item>
            <Dropdown.Item onClick={() => setType('Cat')}>Cat</Dropdown.Item>
            <Dropdown.Item onClick={() => setType('Rabbit')}>Rabbit</Dropdown.Item>
            <Dropdown.Item onClick={() => setType('Small & Furry')}>Small & Furry</Dropdown.Item>
            <Dropdown.Item onClick={() => setType('Horse')}>Horse</Dropdown.Item>
            <Dropdown.Item onClick={() => setType('Bird')}>Bird</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="mx-2">
          <Dropdown.Toggle variant="primary" size="sm" className='search-bar-buttons'>
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
          <Dropdown.Toggle variant="primary" size="sm" className='search-bar-buttons'>
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
          <Dropdown.Toggle variant="primary" size="sm" className='search-bar-buttons'>
            Gender: {gender || 'Any'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setGender('')}>Any</Dropdown.Item>
            <Dropdown.Item onClick={() => setGender('Male')}>Male</Dropdown.Item>
            <Dropdown.Item onClick={() => setGender('Female')}>Female</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Form.Control
          className="mx-2 location-input"
          type="text"
          placeholder="Location (city, state or postal code)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="sm"
        />

        <div className='search-button'>
          <Button onClick={handleSearchClick} variant="primary" size="sm" className="mx-2">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimalTypeSelector;