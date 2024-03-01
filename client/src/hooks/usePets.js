import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';
import Auth from '../utils/auth';
import { fetchToken, fetchPets } from '../utils/api';
import { savePetIds, getSavedPetIds } from '../utils/localStorage';
import he from 'he';

export const usePets = () => {
    const [selectedAnimalType, setSelectedAnimalType] = useState('');
    const [displayedPets, setDisplayedPets] = useState([]);
    const [petBuffer, setPetBuffer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [savedPetIds, setSavedPetIds] = useState(getSavedPetIds());

    const [savePet] = useMutation(SAVE_PET);

    useEffect(() => {
        savePetIds(savedPetIds);
    }, [savedPetIds]);

    const fetchAndDisplayPets = async (animalType = selectedAnimalType, page = 1, fromLoadMore = false) => {
        setLoading(true);
        let fetchedPetsCount = 0;
        let attempts = 0;
        const maxAttempts = 5;
        let newPets = [];
        const targetCount = animalType === 'rabbit' ? 20 : 50;

        while (fetchedPetsCount < targetCount && attempts < maxAttempts) {
            try {
                const { access_token } = await fetchToken(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET);
                const limit = animalType === 'rabbit' ? 100 : 1000 + (attempts * 50);
                const fetchedData = await fetchPets(animalType, access_token, limit, page + attempts);
                const animalsWithImages = fetchedData.animals.filter(animal => animal.photos.length > 0);

                newPets.push(...animalsWithImages.map(animal => ({
                    petId: animal.id,
                    name: animal.name,
                    gender: animal.gender,
                    size: animal.size,
                    age: animal.age,
                    description: he.decode(animal.description || "No description available."),
                    image: animal.photos[0]?.medium || '',
                })));

                fetchedPetsCount = newPets.length;
                attempts += 1;
            } catch (err) {
                console.error(err);
                break;
            }
        }

        if (newPets.length >= targetCount) {
            if (!fromLoadMore || petBuffer.length < targetCount) {
                setDisplayedPets(newPets.slice(0, targetCount));
                setPetBuffer(newPets.slice(targetCount));
            } else {
                setDisplayedPets(petBuffer.slice(0, targetCount));
                setPetBuffer(petBuffer.slice(targetCount).concat(newPets));
            }
        } else {
            setDisplayedPets(newPets);
        }

        setLoading(false);
        setCurrentPage(page + attempts - 1);
    };

    const handleLoadMore = async () => {
        if (petBuffer.length >= 50) {
            setDisplayedPets(currentDisplayedPets => [...currentDisplayedPets, ...petBuffer.slice(0, 50)]);
            setPetBuffer(currentBuffer => currentBuffer.slice(50));
        } else {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            await fetchAndDisplayPets(selectedAnimalType, nextPage, true);
        }
    };

    const handleAnimalType = async (animalType) => {
        setSelectedAnimalType(animalType);
        await fetchAndDisplayPets(animalType);
    };

    const handleSavePet = async (petId) => {
        const petToSave = displayedPets.find((pet) => pet.petId === petId);
        if (!Auth.loggedIn() || !petToSave) return false;

        try {
            await savePet({
                variables: { petData: { petId: petToSave.petId, name: petToSave.name, gender: petToSave.gender, size: petToSave.size, age: petToSave.age, description: petToSave.description, image: petToSave.image } },
            });
            setSavedPetIds((currentIds) => [...currentIds, petToSave.petId]);
        } catch (err) {
            console.error(err);
        }
    };

    return { displayedPets, handleLoadMore, handleAnimalType, handleSavePet, loading, savedPetIds };
};
