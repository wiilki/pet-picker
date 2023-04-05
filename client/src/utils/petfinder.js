require('dotenv').config();
const axios = require('axios');

const generateToken = async () => {
  try {
    const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
      grant_type: 'client_credentials',
      client_id: process.env.PETFINDER_API_KEY,
      client_secret: process.env.PETFINDER_SECRET,
    });

    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
};

export default generateToken;
