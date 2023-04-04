const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/petpicker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

const apiUrl = 'https://api-805C895D-380F-4455-9E67-AC9466E76EF6.sendbird.com';
const apiKey = '18b8c4dcfabe8ba4eece413f58acdf20739c01a6';

// Initialize the connection to the API
const headers = {
  'Api-Key': apiKey
};

async function fetchAnimals(location) {
  // Fetch the animal data from the API
  const response = await fetch(`${apiUrl}/animals?location=${encodeURIComponent(location)}`, { headers });

  if (!response.ok) {
    throw new Error(`Failed to retrieve animals: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}

export { fetchAnimals };
