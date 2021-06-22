const Movie = require('./movieModel')

exports.contMovies = function () {
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
            movieId : obj.id,
            name : obj.name,
            genres : obj.genres,
            image : obj.image,
            premiered : obj.premiered
        });
        console.log(movie)
        movie.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('Created with id: ' + movie._id)
            }
        })
    });
}