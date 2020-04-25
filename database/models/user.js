//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  user_name: String,
  password: String,
  role: Number,
  nested: {address: {
    line1: String,
    line2: String,
    city: String,
    state_or_province: String,
    zip_code_or_postal_code: String,
    country: String
  }}
});

var User = mongoose.model('User', UserModelSchema)
module.exports = User