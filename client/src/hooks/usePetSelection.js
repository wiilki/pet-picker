import { useState } from 'react';

export const usePetSelection = () => {
    const [selectedAnimalType, setSelectedAnimalType] = useState('');

    const handleAnimalType = (animalType, fetchPetsCallback) => {
        setSelectedAnimalType(animalType);
        fetchPetsCallback(animalType);
    };

    return { selectedAnimalType, handleAnimalType };
};
