const { Schema } = require('mongoose');

const favoriteSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

module.exports = favoriteSchema;