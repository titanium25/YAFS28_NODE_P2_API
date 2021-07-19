const mongoose = require('mongoose')
const uri = 'mongodb+srv://node-auth:123@ya28.ns5c7.mongodb.net/project2?retryWrites=true&w=majority'
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
