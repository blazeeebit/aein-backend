const express = require('express');
const router = express.Router();

const {requireSignIn} = require('../authentication/verification/verification');

router.get('/posts', requireSignIn, (req, res) => {
    res.send("posted");
})

module.exports = router;