var User = require("./models/user");
// get all the users
User.find({}, function(err, users) {
  if (err) throw err;
  console.log(users);   // object of all the users
});

// get the user dzilbers
User.find({ username: 'dzilbers' }, function(err, user) {
  if (err) throw err;
  console.log(user);   // object of the user
});

// get a user with ID
User.findById('58177ba1c79ee21e6c5e6fa1', function(err, user) {
  if (err) throw err;
  console.log(user);   // show the one user
});

// get any admin that was created in the past month
// get the date 1 month ago
var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);
User.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, users) {
  if (err) throw err;
  console.log(users); // show the admins in the past month
});

// Update a user
User.findOne({ name: 'Yossi-dude' }, function(err, user) {
  if (err) console.log(err);
  else {
    if (user === null) return;
    // change the users location
    user.location = 'il';
    // save the user
    user.save(function(err) {
      if (err) throw err;
      console.log('User successfully updated!');
    });
  }
});

User.findOneAndUpdate({ username: 'sznaiman' }, { password: '9999' }, function(err, user) {
  console.log("here");
  if (err) throw err;
  console.log(user); // we have the updated user returned to us
});

// Remove Yossi-dude
User.findOne({ name: 'Yossi-dude' }, function(err, user) {
  if (err) throw err;
  if (user === null) {
    console.log('User does not exist!');
    return;
  }
  user.remove(function(err) {
    if (err) console.log(err);
    else
      console.log('User successfully deleted!');
  });
});

