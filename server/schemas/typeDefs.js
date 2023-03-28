const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Pet {
    _id: ID
    name: String
    type: String
    breed: String
    age: Int
    gender: String
    location: String
    imageUrl: String
    description: String
    isAdopted: Boolean
  }

  type Favorites {
    _id: ID
    user: User
    pets: [Pet]
  }

  type Category {
    _id: ID
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input OrderInput {
    products: [ID]!
  }

  type Query {
    me: User
    pets: [Pet]
    pet(_id: ID!): Pet
    favorites: Favorites
    categories: [Category]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addOrder(products: [ID]!): User
    addPet(name: String!, type: String!, breed: String!, age: Int!, gender: String!, location: String!, imageUrl: String!, description: String!): Pet
    updatePet(_id: ID!, name: String, type: String, breed: String, age: Int, gender: String, location: String, imageUrl: String, description: String, isAdopted: Boolean): Pet
    deletePet(_id: ID!): Pet
    addFavorite(petId: ID!): Favorites
    removeFavorite(petId: ID!): Favorites
  }
`;

module.exports = typeDefs;
