// useFetchPets.js
import { useState } from 'react';
import { fetchToken, fetchPets } from '../utils/api';
import he from 'he';

export const useFetchPets = () => {
  const [loading, setLoading] = useState(false);

  const fetchPetData = async (type = '', size = '', age = '', gender = '', url = '', location = '', page = 1) => {
    const { access_token } = await fetchToken(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET);
    const fetchedData = await fetchPets(type, access_token, page, size, age, gender, url);
    return fetchedData.animals.filter(animal => animal.photos.length > 0).map(animal => ({
      petId: animal.id,
      name: animal.name,
      gender: animal.gender,
      size: animal.size,
      age: animal.age,
      description: he.decode(animal.description || "No description available."),
      image: animal.photos[0]?.medium || '',
      url: animal.url,
      location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
    }));
  };

  return { fetchPetData, loading };
};
