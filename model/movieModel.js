const mongoose = require('mongoose')

let MovieSchema = new mongoose.Schema({
    name: String,
    genres: [String],
    premiered: String,
    image: String
}, {collection : 'movies'})

module.exports = mongoose.model('Movie', MovieSchema)