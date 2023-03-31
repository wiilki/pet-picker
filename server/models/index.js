const Users = require('./Users');
const Pet = reqiure('./Pet')
const Favorite = reqiure('./Favorite')
const Category = require('./Category');
const Chat = reqiure('./Chat')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/pet-picker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

module.exports = { Users, Animal, Favorite, Category, Chat };