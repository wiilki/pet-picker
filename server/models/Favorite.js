const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoritesSchema = new Schema({
  animal: [{
    type: Schema.Types.ObjectId,
    ref: 'Animal',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites;
