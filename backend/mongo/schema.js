const mongoose = require('mongoose');

const { Schema } = mongoose;

const pieceOfArt = new Schema({
  title: String,
  description: String,
  place: String,
  image: String,
  largeImage: String,
});

const product = new Schema({
  title: String,
  price: Number,
  description: String,
});

const user = new Schema({
  name: String,
  email: String,
  password: String,
  resetToken: String,
  tokenExpiry: String,
  cart: [product],
});

module.exports = {
  Item: mongoose.model('pieceOfArt', pieceOfArt),
  User: mongoose.model('user', user),
  Product: mongoose.model('product', product),
};
