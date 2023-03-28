const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  thumbnail: { type: String },
  selected: {type: Boolean, default: false },
});

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;