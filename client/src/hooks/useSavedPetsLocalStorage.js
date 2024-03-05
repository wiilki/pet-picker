import { useState, useEffect } from 'react';

export const useSavedPetsLocalStorage = () => {
  const [savedPetIds, setSavedPetIds] = useState(() => {
    // Initialize state with saved pet IDs from local storage
    const savedIds = localStorage.getItem('saved_pets');
    return savedIds ? JSON.parse(savedIds) : [];
  });

  useEffect(() => {
    // Update local storage whenever the savedPetIds state changes
    localStorage.setItem('saved_pets', JSON.stringify(savedPetIds));
  }, [savedPetIds]);

  const savePetId = (petId) => {
    if (!savedPetIds.includes(petId)) {
      setSavedPetIds([...savedPetIds, petId]);
    }
  };

  const removePetId = (petId) => {
    setSavedPetIds(savedPetIds.filter(id => id !== petId));
  };

  return { savedPetIds, savePetId, removePetId };
};
