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


// Get Subs by memberId
router.route('/get/:memberId')
    .get(async function (req, res) {
        const memberId = req.params.memberId;
        // Check if ObjectId is valid
        if (memberId.match(/^[0-9a-fA-F]{24}$/)) {
            let subs = await subsBL.getSubs(memberId);
            res.json(subs);
        } else {
            res.status(404).send('Not Found')
        }
    })

// Delete Subs by member id
router.route('/:memberId')
    .delete(async function (req, res) {
        let memberId = req.params.memberId
        // Check if ObjectId is valid
        if (memberId.match(/^[0-9a-fA-F]{24}$/)) {
            let status = await subsBL.deleteSubs(memberId)
            res.json(status)
        } else {
            res.status(404).send('Not Found')
        }
    })

// Update Subs
router.route('/:id')
    .put(async function (req, res) {
        let id = req.params.id;
        // Check if ObjectId is valid
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let status = await subsBL.updateSubs(id);
            res.json(status);
        } else {
            res.status(404).send('Not Found')
        }
    })

module.exports = router;