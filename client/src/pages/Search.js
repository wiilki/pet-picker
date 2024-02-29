import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';
import { savePetIds, getSavedPetIds } from '../utils/localStorage';
import PetCard from '../components/PetCard/PetCard';
import dogsImage from '../images/dogs.jpg';
import catsImage from '../images/cats.jpg';
import rabbitsImage from '../images/rabbits.jpg';
import Auth from '../utils/auth';
import { fetchToken, fetchPets } from '../utils/api';

const SearchPets = () => {
  const [searchedPets, setSearchedPets] = useState([]);
  const [savedPetIds, setSavedPetIds] = useState(getSavedPetIds());
  const [savePet] = useMutation(SAVE_PET);

  useEffect(() => () => savePetIds(savedPetIds), [savedPetIds]);

  const handleAnimalType = async (animalType) => {
    try {
      const { REACT_APP_CLIENT_ID: CLIENT_ID, REACT_APP_CLIENT_SECRET: CLIENT_SECRET } = process.env;
      const { access_token } = await fetchToken(CLIENT_ID, CLIENT_SECRET);
      const { animals } = await fetchPets(animalType, access_token);

      const petData = animals.map((pet) => ({
        petId: pet.id,
        name: pet.name,
        gender: pet.gender,
        size: pet.size,
        age: pet.age,
        description: pet.description,
        image: pet.photos[0]?.medium || '',
      }));

      setSearchedPets(petData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePet = async (petId) => {
    const petToSave = searchedPets.find((pet) => pet.petId === petId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await savePet({
        variables: { petData: { ...petToSave } },
      });
      setSavedPetIds([...savedPetIds, petToSave.petId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Pets!</h1>
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
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {searchedPets.length ? `Viewing ${searchedPets.length} results:` : 'Search for a pet to begin'}
        </h2>
        <Row>
          {searchedPets.map((pet) => (
            <PetCard
              key={pet.petId}
              pet={pet}
              savedPetIds={savedPetIds}
              handleSavePet={handleSavePet}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchPets;
