import { gql } from '@apollo/client';

export const ADD_FAVORITE_PET = gql`
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

export const REMOVE_FAVORITE_PET = gql`
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

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      username
      firstName
      lastName
      email
    }
  }
`;
