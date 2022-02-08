const express = require('express');

const passport = require('passport');

require('../authentication/passportAuth/authStrategies');

const register = require('../authentication/controllers/register');

const login = require('../authentication/controllers/login');

const {completeRegistration, verfiyToken} = require('../authentication/controllers/verifyaccount');
const { InfoSignedJWT } = require('../authentication/passportAuth/callbacks');

const router = express.Router();

router.get('/', (req,res)=>{
    res.send('<a href="/auth/google">Login With Google</a>');
});

//Google oauth

router.get('/auth/google',  passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/auth/google/callback',  passport.authenticate('google', {
    failureRedirect: '/login/failed'
}), (req,res) => {
    res.redirect('http://localhost:3000/login/success');
});


router.get('/login/failed', (req, res) => {
    res.send('failed');
})

//Faebook auth

router.get('/auth/facebook',  passport.authenticate('facebook', {scope: ['email']}));

router.get('/auth/facebook/callback/',  passport.authenticate('facebook', {
    failureRedirect: '/login/failed'
}), (req,res) => {
    res.redirect('http://localhost:3000/login/success');
});

//Send logged in user back

router.get('/loggedInWithSocial', (req,res) => {
    const token = InfoSignedJWT(req.user);
    res.header('auth-token', token).json({
        token,
        user: req.user
    });
})


router.post('/register', register);

router.post('/login', login);

router.get('/verifyaccount/:token/:email',verfiyToken, completeRegistration);

module.exports = router;