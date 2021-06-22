const mongoose = require('mongoose')

let MovieSchema = new mongoose.Schema({
    movieId: Number,
    name: String,
    genres: [String],
    image: {medium: String, original: String},
    premiered: Date
}, {collection : 'movies'})

module.exports = mongoose.model('Movie', MovieSchema)