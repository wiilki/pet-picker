const db = require('./connection');

const { MongoClient } = require('mongodb');


async function seedAnimals() {
  const animals = [
    {
      name: 'Fish',
      type: 'Dog',
      breed: 'Mut',
      gender: 'female',
      age: 1,
      location: 'Santa Clarita',
      price: 75,
      isAdopted: false
    },
    {
      name: 'Brutus',
      type: 'dog',
      breed: 'Bulldog',
      gender: 'Male',
      age: 2,
      location: 'Irvine',
      price: 850,
      isAdopted: false    },
    {
      name: 'Morty',
      type: 'Cat',
      breed: 'Maine Coon',
      gender: 'female',
      age: 4,
      location: 'Los Angeles',
      price: 0,
      isAdopted: false    }
  ];

  for (const animal of animals) {
    const response = await fetch(`${apiUrl}/animals`, {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animal)
    });

    if (!response.ok) {
      throw new Error(`Failed to seed animal ${animal.name}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(`Animal ${data.name} seeded successfully`);
  }
}

seedAnimals();
