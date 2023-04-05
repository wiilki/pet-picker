import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';
import { savePetIds, getSavedPetIds } from '../utils/localStorage';
import PetCard from '../components/PetCard';

import Auth from '../utils/auth';

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

  // create function to handle retrieving pet data for the selected animal type
  const handleAnimalType = async (animalType) => {
    try {
      const response = await fetch(
        `https://api.petfinder.com/v2/animals?type=${animalType}`,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJXVGFtZkNTZnFoT3M2enRPNkJOMlVXM1dJZkRiOWlKNmhPdndmbWl2M09yT0NuOG92ZyIsImp0aSI6ImIxYTBiMGIwZjJkOWRhMTA1YWQ0YmQyYmJkOTA5MDA5NGMxYzFmYTMzMDZhZDc2NGU3MjEzOGM1NGY2YzExOGZiOTYwNDJlNGI4M2U3ZDdmIiwiaWF0IjoxNjgwNjkyMTk0LCJuYmYiOjE2ODA2OTIxOTQsImV4cCI6MTY4MDY5NTc5NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.gfuDESO-qleIoEHjYqS6cBWescZR4R_DkfGHO8kNRrCaxXAtYzRJvSnvE_peC4wPIpNYn3Q7ouuRTv50oiBTCsVvaESyqqCetBjXDR6vd_oEEvQM0CxFsxfvyG2nkhOQ3EQYlWmVZEiYjbOvquClFTC1vPJ15Be58zi4AcALo_tLFhEoA279-GSWKzfNfS7dOcBsISEYEGdyX0CLoV8pA7CH9swQGlgWanWPJTgslB_h2YzK4u-7S4Wp6vcRwF9rZZeZr5y3pHkeowmJ3Fbqi-n7i44M2z9Y1gtTkxXN6LnptMngqIXVsOmFd38VYQUT3RSPf97w_3pRBkQQ60TIDw`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { animals } = await response.json();

      const petData = animals.map((pet) => ({
        petId: pet.id,
        name: pet.name,
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
            Dog
          </Button>
          <Button onClick={() => handleAnimalType('cat')} variant="primary" size="lg">
            Cat
          </Button>
          <Button onClick={() => handleAnimalType('rabbit')} variant="primary" size="lg">
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