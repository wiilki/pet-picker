const { AuthenticationError } = require('apollo-server-express');
const { User, Animal, Favorites, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Resolve the `me` query, which returns the logged-in user's data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('animal')
          .populate('favorites');
          
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    // Resolve the `animals` query, which returns all animals
    animals: async () => {
      const animals = await Animal.find({});

      return animals;
    },

    // Resolve the `animal` query, which returns a single animal by ID
    animal: async (parent, { _id }) => {
      const animal = await Animal.findById(_id);

      return animal;
    },

    // Resolve the `favorites` query, which returns the logged-in user's favorites
    favorites: async (parent, args, context) => {
      if (context.user) {
        const favorites = await Favorites.findOne({ user: context.user._id }).populate('animals');

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

    // Resolve the `addAnimal` mutation, which adds a new animal
    addAnimal: async (parent, { _id,  }, context) => {
      if (context.user) {
        const animal = await Animal.create(args);

        return animal;
      }

      throw new AuthenticationError('Not logged in');
    },

    // Resolve the `updateAnimal` mutation, which updates a animal's data
    updateAnimal: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        const animal = await Animal.findByIdAndUpdate(_id, args, { new: true });

        return animal;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
    // Resolve the `deleteanimal` mutation, which deletes a animal by ID
    deleteAnimal: async (parent, { _id }, context) => {
      if (context.user) {
        const animal = await Animal.findByIdAndDelete(_id);
  
        return animal;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
    // Resolve the `addFavorite` mutation, which adds a animal to the logged-in user's favorites
    addFavorite: async (parent, { animalId }, context) => {
      if (context.user) {
        const favorites = await Favorites.findOneAndUpdate({ user: context.user._id }, { $addToSet: { animals: animalId } }, { new: true });
  
        return favorites;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
    // Resolve the `removeFavorite` mutation, which removes a animal from the logged-in user's favorites
    removeFavorite: async (parent, { animalId }, context) => {
      if (context.user) {
        const favorites = await Favorites.findOneAndUpdate({ user: context.user._id }, { $pull: { animal: animalId } }, { new: true });
  
        return favorites;
      }
  
      throw new AuthenticationError('Not logged in');
    }
  },
  
  Favorites: {
    // Resolve the `animals` field on the Favorites type, which returns an array of animals
    animals: async ({ animals }) => {
      const animalIds = animals.map(animalId => mongoose.Types.ObjectId(animalId));
      const animalDocs = await Animal.find({ _id: { $in: animalIds } });
  
      return animalDocs;
    }
  }
  };
  
  module.exports = resolvers;
  