const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/pet-picker', { useNewUrlParser: true });

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String, require: true },
  gender: { type: String, require: true },
  age: { type: Number, require: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  isAdopted: { type: Boolean, required: false }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = {
  Animal
};
