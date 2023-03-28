// Possible method to leave comments/chat

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const chatSchema = new Schema({
  chatText: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  chatAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;




// const mongoose = require("mongoose");

// const subChatSchema = new mongoose.Schema(
//   {
//     text: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// const chatSchema = new mongoose.Schema(
//   {
//     senderName: { type: String, required: true },
//     senderId: { type: String, required: true },
//     receiverName: { type: String, required: true },
//     receiverId: { type: String, required: true },
//     subChat: [subChatSchema],
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Chat", chatSchema);
