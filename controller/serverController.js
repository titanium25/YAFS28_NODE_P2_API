const express = require('express');
const router = express.Router();
const movieBL = require('../model/movieBL');
const memberBL = require('../model/memberBL');
const restDAL = require('../DAL/restDAL');

router.route('/')
    .get(async function (req, res) {

        return res.json();
    })

module.exports = router;