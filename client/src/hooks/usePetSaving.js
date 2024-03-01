import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';
import { savePetIds, getSavedPetIds } from '../utils/localStorage';
import Auth from '../utils/auth';

export const usePetSaving = () => {
    const [savedPetIds, setSavedPetIds] = useState(getSavedPetIds());
    const [savePet] = useMutation(SAVE_PET);

    const handleSavePet = async (petId, petDetails) => {
        if (!Auth.loggedIn()) return false;
        
        try {
            await savePet({
                variables: { petData: petDetails },
            });
            setSavedPetIds((currentIds) => [...currentIds, petId]);
        } catch (err) {
            console.error(err);
        }
    };

    return { savedPetIds, handleSavePet };
};
