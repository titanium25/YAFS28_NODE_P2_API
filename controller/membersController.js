const express = require('express');
const router = express.Router();
const memberBL = require('../model/memberBL');

// Get All Members
router.route('/')
    .get(async function (req, res) {
        let members = await memberBL.getAllMembers();
        return res.json(members);
    })

// Get Member by Id
router.route('/:id')
    .get(async function (req, res) {
        let id = req.params.id;
        let member = await memberBL.getMember(id);
        return res.json(member);
    })

// Add Member
router.route('/')
    .post(async function (req, res)
    {
        let obj = req.body
        let status = await memberBL.addMember(obj)
        return res.json(status)
    })

// Update Member
router.route('/:id')
    .put(async function (req, res) {
        let id = req.params.id;
        let obj = req.body;
        let status = await memberBL.updateMember(id, obj);
        return res.json(status);
    })

// Delete Member
router.route('/:id')
    .delete(async function (req, res)
    {
        let id = req.params.id
        let status = await memberBL.deleteMember(id);
        return res.json(status)
    })

module.exports = router;