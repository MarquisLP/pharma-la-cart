//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema;

const PrescriptionModelSchema = new Schema({
  user_name: { type: String, ref: 'User' },
  pharmacy_id: { type: Schema.Types.ObjectId, ref: 'Pharmacy' },
  file_url: String,
  status: Number,
  description: String
});

var Prescription = mongoose.model('Prescription', PrescriptionModelSchema)
module.exports = Prescription