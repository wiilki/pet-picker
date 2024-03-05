const { Schema } = require('mongoose');

const petSchema = new Schema({

  petId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

});

module.exports = petSchema;