import { gql } from '@apollo/client';

export const QUERY_PETS = gql`
  query getPets($type: String, $breed: String, $location: String) {
    pets(type: $type, breed: $breed, location: $location) {
      id
      name
      type
      breed
      age
      gender
      location
      description
      isAdopted
      primary_photo_cropped {
        small
      }
    }
  }
`;

export const QUERY_PET = gql`
  query getPet($petId: ID!) {
    pet(petId: $petId) {
      id
      name
      type
      breed
      age
      gender
      location
      description
      isAdopted
      photos {
        small
      }
    }
  }
`;

export const QUERY_FAVORITE_PETS = gql`
  {
    favoritePets {
      id
      name
      type
      breed
      age
      gender
      location
      description
      isAdopted
      primary_photo_cropped {
        small
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      username
      favoritePets {
        id
        name
        type
        breed
        age
        gender
        location
        description
        isAdopted
        primary_photo_cropped {
          small
        }
      }
    }
  }
`;

export const MUTATION_ADD_FAVORITE_PET = gql`
  mutation addFavoritePet($petId: ID!) {
    addFavoritePet(petId: $petId) {
      id
      name
      type
      breed
      age
      gender
      location
      description
      isAdopted
      primary_photo_cropped {
        small
      }
    }
  }
`;

export const MUTATION_REMOVE_FAVORITE_PET = gql`
  mutation removeFavoritePet($petId: ID!) {
    removeFavoritePet(petId: $petId) {
      id
      name
      type
      breed
      age
      gender
      location
      description
      isAdopted
      primary_photo_cropped {
        small
      }
    }
  }
`;
