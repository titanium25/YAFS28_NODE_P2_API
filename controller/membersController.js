const express = require('express');
const router = express.Router();
const memberBL = require('../model/memberBL');

// Get All Members
router.route('/')
    .get(async function (req, res) {
        let members = await memberBL.getAllMembers();
        res.json(members);
    })

// Get Member by Id
router.route('/:id')
    .get(async function (req, res) {
        let id = req.params.id;
        // Check if ObjectId is valid
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let member = await memberBL.getMember(id);
            res.json(member);
        } else {
            res.status(404).send('Not Found')
        }
    })

// Add Member
router.route('/')
    .post(async function (req, res) {
        let obj = req.body
        let status = await memberBL.addMember(obj)
        res.json(status)
    })

// Update Member
router.route('/:id')
    .put(async function (req, res) {
        let id = req.params.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let obj = req.body;
            let status = await memberBL.updateMember(id, obj);
            res.json(status);
        } else {
            res.status(404).send('Not Found')
        }
    })

// Delete Member
router.route('/:id')
    .delete(async function (req, res) {
        let id = req.params.id
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let status = await memberBL.deleteMember(id);
            res.json(status)
        } else {
            res.status(404).send('Not Found')
        }
    })

module.exports = router;