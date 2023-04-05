const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    petCount: Int
    savedPets: [Pet]
  }

  type Pet {
    petId: ID!
    name: String
    age: String
    gender: String
    size: String
    description: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

input PetInput {
  petId: ID!
  name: String
  age: String
  gender: String
  size: String
  description: String
  image: String
}

  type Query {
    me: User
    pet: Pet
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePet(petData: PetInput!): User
    removePet(petId: ID!): User
  }
`;

module.exports = typeDefs;
