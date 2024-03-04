export const fetchToken = async () => {
    // Access environment variables directly with process.env
    const clientId = process.env.REACT_APP_API_KEY;
    const clientSecret = process.env.REACT_APP_API_SECRET;

    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });
    if (!response.ok) throw new Error('Failed to obtain access token');
    return response.json();
};

export const fetchPets = async ({ species, size, age, gender }, accessToken, page = 1) => {
  const queryParams = new URLSearchParams({
    type: species,
    size: size,
    age: age,
    gender: gender,
    status: 'adoptable',
    limit: 100,
    page: page
  });

  const response = await fetch(`https://api.petfinder.com/v2/animals?${queryParams}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) throw new Error('Failed to fetch pet data');
  return response.json();
};