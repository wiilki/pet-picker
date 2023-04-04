const { Schema } = require('mongoose');

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  idAdopted: {
    type: Boolean,
  },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;