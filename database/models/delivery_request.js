//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema;

const DeliveryRequestModelSchema = new Schema({
  recipient: { type: String, ref: 'User' },
  deliverer: { type: String, ref: 'User' },
  pharmacy_id: { type: Schema.Types.ObjectId, ref: 'Pharmacy' },
  prescription_id:  { type: Schema.Types.ObjectId, ref: 'Prescription' },
  status: Number
});

var DeliveryRequest = mongoose.model('DeliveryRequest', DeliveryRequestModelSchema)
module.exports = DeliveryRequest