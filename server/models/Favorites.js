const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoritesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites;
