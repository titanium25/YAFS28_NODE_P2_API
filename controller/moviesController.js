const express = require('express');
const router = express.Router();
const movieBL = require('../model/movieBL');

// Get All Movies
router.route('/')
    .get(async function (req, res) {
        let movies = await movieBL.getAllMovies()
        res.json(movies);
    })

// Get Movie by Id
router.route('/:id')
    .get(async function (req, res) {
        let id = req.params.id;
        // Check if ObjectId is valid
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let movie = await movieBL.getMovie(id);
            res.json(movie);
        } else {
            res.status(404).send('Not Found')
        }
    })

// Add Movie
router.route('/')
    .post(async function (req, res) {
        let obj = req.body
        console.log(obj)
        let status = await movieBL.addMovie(obj)
        res.json(status)
    })

// Update Movie
router.route('/:id')
    .put(async function (req, res) {
        let id = req.params.id;
        // Check if ObjectId is valid
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let obj = req.body;
            let status = await movieBL.updateMovie(id, obj);
            res.json(status);
        } else {
            res.status(404).send('Not Found')
        }
    })

// Delete Movie
router.route('/:id')
    .delete(async function (req, res) {
        let id = req.params.id
        // Check if ObjectId is valid
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let status = await movieBL.deleteMovie(id);
            res.json(status)
        } else {
            res.status(404).send('Not Found')
        }
    })

module.exports = router;