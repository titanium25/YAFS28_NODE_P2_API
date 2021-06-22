const mongoose = require('mongoose')

let MembersSchema = new mongoose.Schema({
    memberId: Number,
    name: String,
    email: String,
    city: String
}, {collection : 'members'})

module.exports = mongoose.model('User', MembersSchema)