const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, Favorites, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Resolve the `me` query, which returns the logged-in user's data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('pet')
          .populate('favorites');
          
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    // Resolve the `pets` query, which returns all pets
    pets: async () => {
      const pets = await Pet.find({});

      return pets;
    },

    // Resolve the `pet` query, which returns a single pet by ID
    pet: async (parent, { _id }) => {
      const pet = await Pet.findById(_id);

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

    // Resolve the `categories` query, which returns all categories
    categories: async () => {
      const categories = await Category.find({});

      return categories;
    }
  },

  Mutation: {
    // Resolve the `login` mutation, which logs in a user
    login: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.findOne({ firstName, lastName, email, password });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Resolve the `addUser` mutation, which adds a new user
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);

      return { token, user };
    },

    // Resolve the `updateUser` mutation, which updates a user's data
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(context.user._id, args, { new: true });

        return updatedUser;
      }

      throw new AuthenticationError('Not logged in');
    },

    // Resolve the `addPet` mutation, which adds a new pet
    addPet: async (parent, { _id,  }, context) => {
      if (context.user) {
        const pet = await Pet.create(args);

        return pet;
      }

      throw new AuthenticationError('Not logged in');
    },

    // Resolve the `updatePet` mutation, which updates a pet's data
    updatePet: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        const pet = await Pet.findByIdAndUpdate(_id, args, { new: true });

        return pet;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
    // Resolve the `deletePet` mutation, which deletes a pet by ID
    deletePet: async (parent, { _id }, context) => {
      if (context.user) {
        const pet = await Pet.findByIdAndDelete(_id);
  
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
    }
  },
  
  Favorites: {
    // Resolve the `pets` field on the Favorites type, which returns an array of pets
    pets: async ({ pets }) => {
      const petIds = pets.map(petId => mongoose.Types.ObjectId(petId));
      const petDocs = await Pet.find({ _id: { $in: petIds } });
  
      return petDocs;
    }
  }
  };
  
  module.exports = resolvers;
  