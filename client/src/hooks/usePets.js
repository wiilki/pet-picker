import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_PET, REMOVE_PET } from '../utils/mutations';
import Auth from '../utils/auth';
import { fetchToken, fetchPets } from '../utils/api';
import { savePetIds, getSavedPetIds, removePetId } from '../utils/localStorage';
import { saveToCache } from '../utils/cache';
import he from 'he';

export const usePets = () => {
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [displayedPets, setDisplayedPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [savedPetIds, setSavedPetIds] = useState(getSavedPetIds());
  const [selectedGender, setSelectedGender] = useState('');

  const [savePet] = useMutation(SAVE_PET);
  const [removePet] = useMutation(REMOVE_PET);

  useEffect(() => {
    savePetIds(savedPetIds);
  }, [savedPetIds]);


  const fetchAndDisplayPets = async (type = '', size = '', age = '', gender = '', url = '', page = 1, fromLoadMore = false) => {
    setLoading(true);
    page = Math.max(1, Number(page) || 1);

    try {
      const { access_token } = await fetchToken(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET);
      const fetchedData = await fetchPets(type, access_token, page, size, age, gender, url);
      const animalsWithImages = fetchedData.animals.filter(animal => animal.photos.length > 0);

      const newPets = animalsWithImages.map(animal => ({
        petId: animal.id,
        name: animal.name,
        gender: animal.gender,
        size: animal.size,
        age: animal.age,
        description: he.decode(animal.description || "No description available."),
        image: animal.photos[0]?.medium || '',
        url: animal.url,
      }));


      if (fromLoadMore) {
        // Append new pets to the existing ones for infinite scrolling
        setDisplayedPets(currentDisplayedPets => [...currentDisplayedPets, ...newPets]);
      } else {
        // For a new search, replace displayed pets with new ones
        setDisplayedPets(newPets);
      }

      saveToCache('displayedPets', newPets);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    await fetchAndDisplayPets(selectedAnimalType, '', '', selectedGender, currentPage, true); // true indicates loading more pets
  };

  const handleAnimalType = async (type) => {
    setSelectedAnimalType(type);
    setCurrentPage(1); // Reset to the first page
    setDisplayedPets([]); // Clear displayed pets immediately on new search
    await fetchAndDisplayPets(type, '', '', selectedGender, 1, false);
  };


  const handleSavePet = async (petId) => {
    const petToSave = displayedPets.find((pet) => pet.petId === petId);
    if (!Auth.loggedIn() || !petToSave) return false;

    try {
      await savePet({
        variables: { petData: { petId: petToSave.petId, name: petToSave.name, gender: petToSave.gender, size: petToSave.size, age: petToSave.age, description: petToSave.description, image: petToSave.image , url: petToSave.url} },
      });
      setSavedPetIds((currentIds) => [...currentIds, petToSave.petId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePet = async (petId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removePet({
        variables: { petId },
      });

      // upon success, remove pet's id from localStorage
      removePetId(petId);
      setSavedPetIds((currentIds) => currentIds.filter(id => id !== petId)); // Remove from state
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenderChange = async (gender) => {
    setSelectedGender(gender);
    await fetchAndDisplayPets(selectedAnimalType, '', '', gender);
  };

  return { displayedPets, handleLoadMore, handleAnimalType, handleSavePet, handleDeletePet, loading, savedPetIds, handleGenderChange };
};
