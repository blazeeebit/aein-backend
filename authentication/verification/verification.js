const expressJwt = require('express-jwt');

exports.requireSignIn = expressJwt({
	//secret, expirydate
	secret: process.env.JWT_SECRET,
	algorithms: [ 'HS256' ]
});
