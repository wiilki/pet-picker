import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';
import { savePetIds, getSavedPetIds } from '../utils/localStorage';
import PetCard from '../components/PetCard';
import dogsImage from '../images/dogs.jpg';
import catsImage from '../images/cats.jpg';
import rabbitsImage from '../images/rabbits.jpg';
import Auth from '../utils/auth';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const SearchPets = () => {
  // create state for holding returned pet data
  const [searchedPets, setSearchedPets] = useState([]);

  // create state to hold saved petId values
  const [savedPetIds, setSavedPetIds] = useState(getSavedPetIds());

  const [savePet] = useMutation(SAVE_PET);

  // set up useEffect hook to save `savedPetIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savePetIds(savedPetIds);
  });

  const handleAnimalType = async (animalType) => {
    try {
      // get access token from the API
      const tokenResponse = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      });
  
      if (!tokenResponse.ok) {
        throw new Error('Failed to obtain access token');
      }
  
      const { access_token } = await tokenResponse.json();
  
      // use the access token to fetch pet data
      const petResponse = await fetch(
        `https://api.petfinder.com/v2/animals?type=${animalType}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
  
      if (!petResponse.ok) {
        throw new Error('Failed to fetch pet data');
      }
  
      const { animals } = await petResponse.json();
  
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
  

  // create function to handle saving a pet to our database
  const handleSavePet = async (petId) => {
    // find the pet in `searchedPets` state by the matching id
    const petToSave = searchedPets.find((pet) => pet.petId === petId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await savePet({
        variables: { petData: { ...petToSave } },
      });
      console.log(savedPetIds);
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
          <Button onClick={() => handleAnimalType('dog')} variant="primary" size="lg">
            <img src={dogsImage} alt="Dog" />
            Dog
          </Button>
          <Button onClick={() => handleAnimalType('cat')} variant="primary" size="lg">
            <img src={catsImage} alt="Cat" />
            Cat
          </Button>
          <Button onClick={() => handleAnimalType('rabbit')} variant="primary" size="lg">
            <img src={rabbitsImage} alt="Rabbit" />
            Rabbit
          </Button>

        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {searchedPets.length
            ? `Viewing ${searchedPets.length} results:`
            : 'Search for a pet to begin'}
        </h2>
        <Row>
          {searchedPets.map((pet) => {
            return (
              <PetCard
                key={pet.petId}
                pet={pet}
                savedPetIds={savedPetIds}
                handleSavePet={handleSavePet}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
};




export default SearchPets;