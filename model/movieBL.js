const Movie = require('./movieModel')

exports.countMovies = function () {
      return Movie.countDocuments({});
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

exports.getMovie = function (id) {
       return  Movie.findById(id)
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