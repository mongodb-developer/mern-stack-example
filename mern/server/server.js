const express = require("express");
const app = express();

const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require("cors");

const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });


app.use(session({
  //need to generate secret and put in .env
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(cors());
app.use(express.json());
app.use('/record', require("./routes/record"));
app.use('/', require('./routes/index.js'));

//needs right address

//mongoose.connect('mongodb://localhost:27017');
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://admin2:UKIJtKO5h7QJbLZM@cluster0.c9dnp.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

const User = require('./models/user');

run()
async function run() {
  const user = new User({ name: 'Kyle', someID: 'id number' })
  await user.save()
  console.log(user)
}














// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
