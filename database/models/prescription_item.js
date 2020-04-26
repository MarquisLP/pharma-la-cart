//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema;

const PrescriptionItemModelSchema = new Schema({
  prescription_id: { type: Schema.Types.ObjectId, ref: 'Prescription' },
  medicine_id: { type: Schema.Types.ObjectId, ref: 'Medicine' },
  quantity: Number
});

var PrescriptionItem = mongoose.model('PrescriptionItem', PrescriptionItemModelSchema)
module.exports = PrescriptionItem