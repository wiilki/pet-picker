const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Animal {
    _id: ID
    name: String
    type: String
    breed: String
    gender: String
    age: Int
    location: String
    price: Float
    description: String
    isAdopted: Boolean
    imageUrl: String
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

  type User {
    id: ID!
    username: String
    email: String
    role: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  input SignupInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
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
    animals: [Animal]
    animal(_id: ID!): Animal
    favorites: Favorites
    categories: [Category]
    users: [User]
    me: User
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
