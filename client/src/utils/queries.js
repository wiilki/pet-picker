import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedPets {
        petId
        name
        gender
        size
        age
        description
        image
      }
    }
  }
`;

export const QUERY_SINGLE_PET = gql`
  {
    pet {
      petId
      name
      gender
      size
      age
      description
      image
  }
}
`;

