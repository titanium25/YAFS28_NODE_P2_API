const express = require('express');
const router = express.Router();
const movieBL = require('../model/movieBL');

// Get All Movies
router.route('/')
    .get(async function (req, res) {
        let members = await movieBL.getAllMovies()
        res.json(members);
    })

// Get Movie by Id
router.route('/:id')
    .get(async function (req, res) {
        let id = req.params.id;
        let member = await movieBL.getMovie(id);
        res.json(member);
    })

// Add Movie
router.route('/')
    .post(async function (req, res)
    {
        let obj = req.body
        let status = await movieBL.addMovie(obj)
        res.json(status)
    })

// Update Movie
router.route('/:id')
    .put(async function (req, res) {
        let id = req.params.id;
        let obj = req.body;
        let status = await movieBL.updateMovie(id, obj);
        res.json(status);
    })

// Delete Member
router.route('/:id')
    .delete(async function (req, res)
    {
        let id = req.params.id
        let status = await movieBL.deleteMovie(id);
        res.json(status)
    })

module.exports = router;