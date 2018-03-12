var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');

var Schema = mongo.Schema;
var userSchema = new Schema({ // create a schema
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: { age: Number, website: String }, // field-object (with sub-fields)
  created_at: Date,
  updated_at: Date
});

// custom method to add string to end of name…
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 
  return this.name;
};

// on every save, add the date
userSchema.pre('save', function(next) { //callback
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

var User = db.model('User', userSchema);
module.exports = User;
