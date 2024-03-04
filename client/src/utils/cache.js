// Save data to sessionStorage
export const saveToCache = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };
  
  // Retrieve data from sessionStorage
  export const loadFromCache = (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };