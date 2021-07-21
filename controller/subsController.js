const express = require('express');
const router = express.Router();
const subsBL = require('../model/subs/subsBL');

// Get All Subs
router.route('/')
    .get(async function (req, res) {
        const subs = await subsBL.getAllSubs();
        res.json(subs);
    })

// Add Subs
router.route('/')
    .post(async function (req, res) {
        let obj = req.body
        let status = await subsBL.addSubs(obj)
        res.json(status)
    })


// Get Movies by memberId - return array of Members movies
router.route('/get/:memberId')
    .get(async function (req, res) {
        const memberId = req.params.memberId;
        // Check if ObjectId is valid
        if (memberId.match(/^[0-9a-fA-F]{24}$/)) {
            let subs = await subsBL.getSubs(memberId);
            console.log(subs)
            res.json(subs);
        } else {
            res.status(404).send('Not Found')
        }
    })


// Update Movie
// router.route('/:id')
//     .patch(async function (req, res) {
//         let id = req.params.id;
//         // Check if ObjectId is valid
//         if (id.match(/^[0-9a-fA-F]{24}$/)) {
//             let obj = req.body;
//             let status = await movieBL.updateMovie(id, obj);
//             res.json(status);
//         } else {
//             res.status(404).send('Not Found')
//         }
//     })

// Delete Movie
// router.route('/:id')
//     .delete(async function (req, res) {
//         let id = req.params.id
//         // Check if ObjectId is valid
//         if (id.match(/^[0-9a-fA-F]{24}$/)) {
//             let status = await movieBL.deleteMovie(id);
//             res.json(status)
//         } else {
//             res.status(404).send('Not Found')
//         }
//     })

module.exports = router;