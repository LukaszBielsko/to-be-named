const mongoose = require('mongoose')

const Schema = mongoose.Schema


const pieceOfArt = new Schema({
    title: String,
    description: String,
    place: String
})

module.exports = mongoose.model('pieceOfArt', pieceOfArt)
