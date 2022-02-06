const express = require('express');

const register = require('../authentication/controllers/register');

const login = require('../authentication/controllers/login');

const {completeRegistration, verfiyToken} = require('../authentication/controllers/verifyaccount');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/verifyaccount/:token/:email',verfiyToken, completeRegistration);

module.exports = router;