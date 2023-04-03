const petfinder = {
    getToken: async function() {
      const clientId = '9gSueaI6Vk4On9SsUSxGAVdYH4CfunaBEaGmRDLzlLTSALvP01';
      const clientSecret = 'E0CmkPvQyEa5jZcI4Nxl73DvYtAaxAhE7Zj2kx1E';
  
      const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.access_token;
    },

    search: async function(searchOptions) {
      const token = await this.getToken();
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const queryParams = new URLSearchParams();
      if (searchOptions.type) {
        queryParams.append('type', searchOptions.type);
      }
      if (searchOptions.breed) {
        queryParams.append('breed', searchOptions.breed);
      }
      if (searchOptions.age) {
        queryParams.append('age', searchOptions.age);
      }
      if (searchOptions.gender) {
        queryParams.append('gender', searchOptions.gender);
      }
      if (searchOptions.location) {
        queryParams.append('location', searchOptions.location);
      }
      const url = `https://api.petfinder.com/v2/animals?${queryParams.toString()}`;
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    }
  
    };
    
    export default petfinder;