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
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJXVGFtZkNTZnFoT3M2enRPNkJOMlVXM1dJZkRiOWlKNmhPdndmbWl2M09yT0NuOG92ZyIsImp0aSI6IjljNTVkMGI2NzIzZmY1NGEwYjM3N2EzZWUzOTNiZThjOTJlZTA1NWQxYTI3ZGZjMTU0YTkxZTllNDgxNmFkNmI0YWRlNzQ4NjVjYThlMTQ2IiwiaWF0IjoxNjgwNjk0MDM0LCJuYmYiOjE2ODA2OTQwMzQsImV4cCI6MTY4MDY5NzYzNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.Emdu3YeWzCv-l8kU6xOMxLYtyh_WREvyUCNAgMPs-8ofucF98S7OURKbhKjOqo_20unlxMIfXHF-5tsDOqBU-It1D-6vVOpWJg9VTwXnf0HV4H1gqN5D2hDZKt6CX4yIX_nhUfKjPgPqrEhugs7iP91mk0DHuiBgkmSYTYDbXCxDasqipnMNQevu58wAKXOJdlaAwqhoRzU7IMmdFndi5HbLXKl2feUr8wVjVLjLYjCWsWDgKX4k_ZM1K1pzGJVtLH2xNa03l1WSgP_APhckrQnaqSETmMDn7MCDZRT7kZ4r4zbAS-yeco_NewZKYMoI6bQer87t2KsRfJS8MacFbQ`,
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