//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema;

const PharmacyMedicineModelSchema = new Schema({
  pharmacy_id: { type: Schema.Types.ObjectId, ref: 'Pharmacy' },
  medicine_id: { type: Schema.Types.ObjectId, ref: 'Medicine' }
});

var PharmacyMedicine = mongoose.model('PharmacyMedicine', PharmacyMedicineModelSchema)
module.exports = PharmacyMedicine