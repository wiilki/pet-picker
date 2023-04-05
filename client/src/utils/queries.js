import { gql } from '@apollo/client';

export const QUERY_ANIMALS = gql`
  query getAnimals($type: String, $breed: String, $location: String) {
    animals(category: $category) {
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

export const QUERY_ALL_ANIMAL = gql`
  {
    animals {
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

export const QUERY_FAVORITE_ANIMAL = gql`
  query {
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

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
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
