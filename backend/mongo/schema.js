const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pieceOfArt = new Schema({
  title: String,
  description: String,
  place: String,
  image: String,
  largeImage: String
});

const user = new Schema({
  name: String,
  email: String,
  password: String
})

exports.pieceOfArt = mongoose.model("pieceOfArt", pieceOfArt);
exports.user = mongoose.model('user', user)
