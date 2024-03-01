import { useState } from 'react';
import { fetchToken, fetchPets } from '../utils/api';
import he from 'he';

export const usePetFetching = (selectedAnimalType) => {
    const [displayedPets, setDisplayedPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [petBuffer, setPetBuffer] = useState([]);

const fetchAndDisplayPets = async (animalType, page = 1, fromLoadMore = false) => {
    
        setLoading(true);

        let fetchedPetsCount = 0;
        let attempts = 0;
        const maxAttempts = 5;
        let newPets = [];
        // Define a different target count for rabbits or default to 50 for other animals
        const targetCount = animalType === 'rabbit' ? 20 : 50; // Assuming rabbits will have a lower target count like 20

        while (fetchedPetsCount < targetCount && attempts < maxAttempts) {
            try {
                const { access_token } = await fetchToken(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET);
                // Adjust the limit more conservatively for rabbits, if necessary
                const limit = animalType === 'rabbit' ? 100 : 1000 + (attempts * 50);
                const fetchedData = await fetchPets(animalType, access_token, limit, page + attempts);
                const animalsWithImages = fetchedData.animals.filter(animal => animal.photos.length > 0);

                newPets.push(...animalsWithImages.map(animal => ({
                    petId: animal.id,
                    name: animal.name,
                    gender: animal.gender,
                    size: animal.size,
                    age: animal.age,
                    description: animal.description || "No description available.",
                    image: animal.photos[0]?.medium || '',
                })));

                fetchedPetsCount = newPets.length;
                attempts += 1;
            } catch (err) {
                console.error(err);
                break; // Exit the loop on error
            }
        }

        // Adjust displayed and buffered pets based on actual fetched count
        if (newPets.length >= targetCount) {
            if (!fromLoadMore || petBuffer.length < targetCount) {
                setDisplayedPets(newPets.slice(0, targetCount));
                setPetBuffer(newPets.slice(targetCount));
            } else {
                setDisplayedPets(petBuffer.slice(0, targetCount));
                setPetBuffer(petBuffer.slice(targetCount).concat(newPets));
            }
        } else {
            // If fewer pets are fetched than the target count, display all new pets
            setDisplayedPets(newPets);
            // No need to adjust the buffer if we're displaying all new pets
        }

        setLoading(false);
        setCurrentPage(page + attempts - 1); // Update the current page based on attempts
    };

    return { displayedPets, fetchAndDisplayPets, loading, currentPage, setDisplayedPets, petBuffer, setPetBuffer };
};
