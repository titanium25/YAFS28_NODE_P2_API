const Subs = require('../subs/subsModel')

exports.getAllSubs = function () {
    return Subs.find();
}

exports.addSubs = async function (obj) {
    const filter = {memberId: obj.memberId};
    const movie = {movieId: obj.movieId, date: obj.date};
    await Subs.find(filter, async function (err, docs) {
        if (err) {
            console.log('Creating new subs')
                let subs = new Subs({
                    memberId: obj.memberId,
                    movies: [
                        {
                            movieId: obj.movieId,
                            date: obj.date
                        }
                    ]
                }).save
        } else {
            console.log('Updating existing subs')
            await Subs.findOneAndUpdate(
                filter,
                {$push: {movies: movie}},
                {safe: true, upsert: true},
            )

        }
    })
}

exports.getSubs = async function (memberId) {
    const filter = {memberId: memberId};
    let subs = await Subs.find(filter)
    return subs[0]
}

// exports.updateMovie = function (id, obj) {
//     return new Promise((resolve, reject) => {
//         Movie.findByIdAndUpdate(id, {
//             movieId : obj.id,
//             name : obj.name,
//             genres : obj.genres,
//             image : obj.image,
//             premiered : obj.premiered
//         }, function (err) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve('Updated!')
//             }
//         })
//     });
// }
//
// exports.deleteMovie = function (id){
//        return  Movie.findByIdAndDelete(id);
// }