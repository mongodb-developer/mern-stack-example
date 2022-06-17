const express = require("express");
const app = express();

const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require("cors");

const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });


app.use(cors());
app.use(express.json());
app.use('/record', require("./routes/record"));
app.use('/', require('./routes/index.js'));

//needs right address
mongoose.connect('mongodb+srv://admin2:GJNfspGza5CdZWAJ@cluster0.c9dnp.mongodb.net/?retryWrites=true&w=majority');


//Session
app.use(session({
  //need to generate secret and put in .env
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());













// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});