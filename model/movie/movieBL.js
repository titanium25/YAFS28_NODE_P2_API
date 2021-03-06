const Movie = require('./movieModel')
const subsBL = require('../subs/subsBL')

exports.countMovies = function () {
      return Movie.countDocuments({});
}

exports.addMovie = function (obj) {
    return new Promise((resolve, reject) => {
        let movie = new Movie({
            name : obj.name,
            genres : obj.genres,
            image : obj.image.medium || obj.image,
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

exports.getAllMovies = async function (page, size, find) {
    const movies = await Movie.find({});
    if (find) {
        return movies.filter(movie =>
            (movie.name.toLowerCase().includes(find.toLowerCase()) || find === '')
        )
    }
    return Movie.find()
        .skip((size * page) - size)
        .limit(size)
}

// Return movie list for dropdown menu with movies that member has not watched yet
exports.dropDown = async function (memberId) {
    // load member subscription
    const subs = await subsBL.getSubs(memberId)

    // not all members got subscription yet
    if(subs) {
        // pull movie id only
        const moviesWatchedArr = subs.movies.map(obj => obj.movieId)
        // return dropdown without movies that member watched
        return Movie.find({_id: {$nin: moviesWatchedArr}});
    } else {
        // member has not got subscription yet, return all the movies
        return Movie.find({})
    }
}

exports.getMovie = function (id) {
       return Movie.findById(id)
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
       return  Movie.findByIdAndDelete(id);
}