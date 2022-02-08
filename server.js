const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fs = require('fs')
const morgan = require('morgan')
require('dotenv').config()
const passport = require("passport");
const cookieSession = require('cookie-session');

const app = express()

//middlewares

app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_SECRET]
}))


app.use(passport.initialize());
app.use(passport.session());

//getting routes

fs.readdirSync('./routes').map((r) => app.use('/', require(`./routes/${r}`)))

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log('Connected to data base')
  })
  .catch((error) => {
    console.log('db connection error : ', error)
  })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});
