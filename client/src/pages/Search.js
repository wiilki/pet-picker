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
            Authorization: `Bearer WTamfCSfqhOs6ztO6BN2UW3WIfDb9iJ6hOvwfmiv3OrOCn8ovg&client_secret=yWl76qMZEfocKnKVvziEWgRvdyfjWXtrAdlVB037" https://api.petfinder.com/v2/oauth2/token
{"token_type":"Bearer","expires_in":3600,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJXVGFtZkNTZnFoT3M2enRPNkJOMlVXM1dJZkRiOWlKNmhPdndmbWl2M09yT0NuOG92ZyIsImp0aSI6IjViMDhjN2I0NjU4YTQ3MzdjOGUwOThiYzYyZDc5NTg5YTc0NmEzYzdkNzYwZjY2YmRhMjBjYTA4MmU4ZGYyYWYyMTlmNzNiN2QxNDQwZjRjIiwiaWF0IjoxNjgwNzM3MzczLCJuYmYiOjE2ODA3MzczNzMsImV4cCI6MTY4MDc0MDk3Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.TtDaCnBbG5PsFCzklkzgw-VHCayuF-9s8iBKJuBGPDJ8lWOysotMSLuwcTQXUHe5nn9HmwiG_vPXzSBjC5LyKnsDQ8uhz_55pt2sg0qTvFGOZ9-Oxc40i006DIFuCOtaPXHjIulr8MI7mBuj9JfsU1He7ivDhbTHRVFydh-DqD5KXMCbQDBZsgdYHK1jp-hjUkSt_lPuuKbm6YrhEqVNM0vf2GyWTeG8Eml0NjU8JVcTflJx2dTNx2dFkuMimP8-OWkTjjVGQJG95JjiCMp-NH6aVMOa-RuvH6cgHduJpf8Ku6JdT_gkbtm0DadpEWV2DIB9u0_OrQz3Nw4TRjx2uw`,
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
