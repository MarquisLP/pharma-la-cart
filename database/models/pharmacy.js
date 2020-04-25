//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema;

const PharmacyModelSchema = new Schema({
  name: String,
  owner_name: { type: String, ref: 'User' },
  nested: {address: {
    line1: String,
    line2: String,
    city: String,
    state_or_province: String,
    zip_code_or_postal_code: String,
    country: String
  }}
});

var Pharmacy = mongoose.model('Pharmacy', PharmacyModelSchema)
module.exports = Pharmacy