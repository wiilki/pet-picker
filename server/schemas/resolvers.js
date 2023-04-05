const { AuthenticationError } = require('apollo-server-express');
const { User, Animal, Favorites, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Resolve the `categories` query, which returns all categories
    categories: async () => {
      const categories = await Category.find({});

      return categories;
    },
    // Resolve the `pets` query, which returns all pets
    animals: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Animal.find(params).populate('category');
    },

    // Resolve the `pet` query, which returns a single pet by ID
    animal: async (parent, { _id }) => {
      const pet = await Animal.findById(_id);

      return pet;
    },

    // Resolve the `favorites` query, which returns the logged-in user's favorites
    favorites: async (parent, args, context) => {
      if (context.user) {
        const favorites = await Favorites.findOne({ user: context.user._id }).populate('pets');

        return favorites;
      }

      throw new AuthenticationError('Not logged in');
    },
    // Resolve the `me` query, which returns the logged-in user's data
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('category');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    // Resolve the `addUser` mutation, which adds a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Resolve the `updateUser` mutation, which updates a user's data
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },

    // Resolve the `addPet` mutation, which adds a new pet
    addPet: async (parent, { _id, ...args  }, context) => {
      if (context.user) {
        const pet = await Pet.create(args);

        return pet;
      }

      throw new AuthenticationError('Not logged in');
    },

    // Resolve the `updatePet` mutation, which updates a pet's data
    updatePet: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        const pet = await Animal.findByIdAndUpdate(_id, args, { new: true });

        return pet;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
    // Resolve the `deletePet` mutation, which deletes a pet by ID
    deletePet: async (parent, { _id }, context) => {
      if (context.user) {
        const pet = await Animal.findByIdAndDelete(_id);
  
        return pet;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
    // Resolve the `addFavorite` mutation, which adds a pet to the logged-in user's favorites
    addFavorite: async (parent, { petId }, context) => {
      if (context.user) {
        const favorites = await Favorites.findOneAndUpdate({ user: context.user._id }, { $addToSet: { pets: petId } }, { new: true });
  
        return favorites;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
    // Resolve the `removeFavorite` mutation, which removes a pet from the logged-in user's favorites
    removeFavorite: async (parent, { petId }, context) => {
      if (context.user) {
        const favorites = await Favorites.findOneAndUpdate({ user: context.user._id }, { $pull: { pets: petId } }, { new: true });
  
        return favorites;
      }
  
      throw new AuthenticationError('Not logged in');
    },
    // Resolve the `login` mutation, which logs in a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  }
};
  
  module.exports = resolvers;
  