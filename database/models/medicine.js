//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema;

const MedicineModelSchema = new Schema({
  name: String
});

var Medicine = mongoose.model('Medicine', MedicineModelSchema)
module.exports = Medicine