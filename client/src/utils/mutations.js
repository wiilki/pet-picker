import { gql } from '@apollo/client'; 

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
mutation addUser(
    $firstName: String!
    $lastName: String! 
    $email: String! 
    $password: String!
    ) {
        addUser(
            firstName: $firstName 
            lastName: $lastName 
            email: $email
            password: $password
        ) {
            token 
            user {
                _id
            }
        }
    }
`;

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