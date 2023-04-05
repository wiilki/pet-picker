const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Animal {
    _id: ID
    name: String
    type: String
    breed: String
    gender: String
    age: Int
    location: String
    description: String
    isAdopted: Boolean 
    category: Category
  }

  type Favorites {
    _id: ID
    animals: [Animal]
    createdAt: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    animals(category: ID, name: String): [Animal]
    animal(_id: ID!): Animal
    favorites: Favorites
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addPet(name: String!, type: String!, breed: String!, age: Int!, gender: String!, location: String!, imageUrl: String!, description: String!): Animal
    updatePet(_id: ID!, name: String, type: String, breed: String, age: Int, gender: String, location: String, imageUrl: String, description: String, isAdopted: Boolean): Animal
    deletePet(_id: ID!): Animal
    addFavorite(petId: ID!): Favorites
    removeFavorite(petId: ID!): Favorites
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
