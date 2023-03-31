import {
    UPDATE_PETS,
    ADD_TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
    UPDATE_FAVORITES,
    UPDATE_USER,
    TOGGLE_FAVORITES
  } from "./actions";
  
  const initialState = {
    pets: [],
    favorites: [],
    user: null,
    favoritesOpen: false
  };
  
  export const reducers = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PETS:
        return {
          ...state,
          pets: [...action.pets],
        };
  
      case ADD_TO_FAVORITES:
        return {
          ...state,
          favoritesOpen: true,
          favorites: [...state.favorites, action.pet],
        };
  
      case REMOVE_FROM_FAVORITES:
        let newFavorites = state.favorites.filter(pet => {
          return pet.id !== action.petId;
        });
  
        return {
          ...state,
          favoritesOpen: newFavorites.length > 0,
          favorites: newFavorites
        };
  
      case UPDATE_FAVORITES:
        return {
          ...state,
          favorites: [...action.favorites],
        };
  
      case UPDATE_USER:
        return {
          ...state,
          user: action.user
        };
  
      case TOGGLE_FAVORITES:
        return {
          ...state,
          favoritesOpen: !state.favoritesOpen
        };
  
      default:
        return state;
    }
  };
  
  export default reducers;
  