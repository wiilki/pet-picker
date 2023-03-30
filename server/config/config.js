const apiUrl = 'https://api-805C895D-380F-4455-9E67-AC9466E76EF6.sendbird.com';
const apiKey = '18b8c4dcfabe8ba4eece413f58acdf20739c01a6';

const animalList = document.getElementById('animal-list');

// Fetch the animal data from the API
fetch(`${apiUrl}/animals?area=${encodeURIComponent('Your Area')}`, {
  headers: {
    'Api-Key': apiKey
  }
})
.then(response => response.json())
.then(data => {
  // Loop through the animals and add them to the list
  data.forEach(animal => {
    const listItem = document.createElement('li');
    listItem.textContent = `${animal.name} - ${animal.type} - ${animal.price}`;
    animalList.appendChild(listItem);
  });
})
.catch(error => console.error(error));

