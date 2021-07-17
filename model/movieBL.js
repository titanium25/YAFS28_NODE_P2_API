const Movie = require('./movieModel')

exports.countMovies = function () {
    return new Promise((resolve, reject) => {
        Movie.countDocuments({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.addMovie = function (obj) {
    return new Promise((resolve, reject) => {
        let movie = new Movie({
            name : obj.name,
            genres : obj.genres,
            image : obj.image,
            premiered : obj.premiered
        });
        movie.save(function (err) {
            if (err) {
                reject(console.log(err));
            } else {
                resolve('Created with id: ' + movie._id)
            }
        })
    });
}

exports.getAllMovies = function (){
    return new Promise((resolve, reject) => {
        Movie.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getMovie = function (id) {
    return new Promise((resolve, reject) => {
        Movie.findById(id, function (err, data) {
            if (err) {
                reject(console.log(err))
            } else {
                resolve(data)
            }
        })
    })
}

exports.updateMovie = function (id, obj) {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(id, {
            movieId : obj.id,
            name : obj.name,
            genres : obj.genres,
            image : obj.image,
            premiered : obj.premiered
        }, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve('Updated!')
            }
        })
    });
}

exports.deleteMovie = function (id){
    return new Promise((resolve, reject) => {
        Movie.findByIdAndDelete(id, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve('Deleted!')
            }
        })
    })
}