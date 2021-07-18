const mongoose = require('mongoose')

let MovieSchema = new mongoose.Schema({
    name: String,
    genres: [String],
    premiered: String,
    image: String
}, {collection : 'movies'})
// MovieSchema.index({name: 'text'})
module.exports = mongoose.model('Movie', MovieSchema)