var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var User = require("./models/user");
// create a new user called Yossi
var user = new User({
  name: 'Yossi',
  username: 'Levi',
  password: '12345' 
});
// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
user.dudify(function(err, name) {
  if (err) throw err;
  console.log('Your new name is ' + name);
});
// call the built-in save method to save to the database
user.save(function(err) {
  if (err) throw err;
  console.log('User saved successfully!');
});

// create more users
User({
  name: 'Dani Zilberstein',
  username: 'dzilbers',
  password: 'danidani',
  admin: true
}).save(function(err) {
  if (err) throw err;
  console.log('User created!');
});

User.create({
  name: 'Shmuel-Zvi Naiman',
  username: 'sznaiman',
  password: 'naiman',
  admin: true
}, function(err, user) {
  if (err) throw err;
  console.log('User created:' + user);
});


module.exports = router;
