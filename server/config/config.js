// Set up the API endpoint URL and API key
const url = "https://api-805C895D-380F-4455-9E67-AC9466E76EF6.sendbird.com";
const apiKey = "18b8c4dcfabe8ba4eece413f58acdf20739c01a6";

// Set up the request headers
const headers = new Headers();
headers.append("Api-Token", apiKey);

// Make the API call
fetch(url, { headers })
  .then(response => response.json())
  .then(data => {
    // Handle the API response data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur
    console.error(error);
  });
