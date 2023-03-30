const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/myapp', { useNewUrlParser: true });

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  area: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['for sale', 'for adoption'], required: true }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = {
  Animal
};
