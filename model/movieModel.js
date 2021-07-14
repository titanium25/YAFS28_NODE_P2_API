const mongoose = require('mongoose')

let MovieSchema = new mongoose.Schema({
    name: String,
    genres: [String],
    premiered: Date,
    image: {medium: String, original: String}
}, {collection : 'movies'})

module.exports = mongoose.model('Movie', MovieSchema)