import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_PET, REMOVE_PET } from '../utils/mutations';
import Auth from '../utils/auth';
import { savePetIds } from '../utils/localStorage';
import { saveToCache } from '../utils/cache';
import { useSavedPetsLocalStorage } from './useSavedPetsLocalStorage';
import {useFetchPets } from './useFetchPets'

export const usePets = () => {
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [displayedPets, setDisplayedPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const { savedPetIds, savePetId, removePetId } = useSavedPetsLocalStorage();
  const { fetchPetData } = useFetchPets();

  const [savePet] = useMutation(SAVE_PET);
  const [removePet] = useMutation(REMOVE_PET);

  useEffect(() => {
    savePetIds(savedPetIds);
  }, [savedPetIds]);

  const displayPetData = (newPets, fromLoadMore) => {
    if (fromLoadMore) {
      setDisplayedPets(currentDisplayedPets => [...currentDisplayedPets, ...newPets]);
    } else {
      setDisplayedPets(newPets);
    }
    saveToCache('displayedPets', newPets);
  };

  const fetchAndDisplayPets = async (type = '', size = '', age = '', gender = '', page = 1, fromLoadMore = false) => {
    setLoading(true);
    page = Math.max(1, Number(page) || 1);

    try {
      const newPets = await fetchPetData(type, size, age, gender, '', page);
      displayPetData(newPets, fromLoadMore);
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
        variables: { petData: { petId: petToSave.petId, name: petToSave.name, gender: petToSave.gender, size: petToSave.size, age: petToSave.age, description: petToSave.description, image: petToSave.image, url: petToSave.url } },
      });
      savePetId(petId)
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
