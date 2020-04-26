module.exports = function(server) {
  const { isLoggedin } = require('../route_utils')

  const Pharmacy = require('../../database/models/pharmacy')
  const Medicine = require('../../database/models/medicine')
  const PharmacyMedicine = require('../../database/models/pharmacy_medicine')

  server.post('/api/pharmacies/', isLoggedin, async function(req, res, next) {
    const reqPharmacy = req.body
    Pharmacy.create(reqPharmacy, function(err, newPharmacy){
      if (err){
        console.log(err);
        return res.status(400).json("Bad Request");
      }
      if (newPharmacy){
        res.status(201).json(newPharmacy)
      }
    });
  })

  server.get('/api/pharmacies/:pharmacy_id', isLoggedin, async function(req, res, next) {
    const reqPharmacyId = req.params.pharmacy_id
    var query  = Pharmacy.where({ _id: reqPharmacyId });
    query.findOne(function (err, pharmacy) {
      if (!pharmacy) {
        return res.status(404).json("Not Found")
      }
      if (pharmacy) {
        return res.status(200).json(pharmacy)
      }
    });
  })

  server.get('/api/pharmacies/user/:owner_name', isLoggedin, async function(req, res, next) {
    const reqOwnerName = req.params.owner_name
    var query  = Pharmacy.where({ owner_name: reqOwnerName });
    query.findOne(function (err, pharmacy) {
      if (!pharmacy) {
        return res.status(404).json("Not Found")
      }
      if (pharmacy) {
        return res.status(200).json(pharmacy)
      }
    });
  })

  server.post('/api/pharmacies/:pharmacy_id/inventory/medicines/:medicine_id', isLoggedin, async function(req, res, next) {
    const reqPharmacyId = req.params.pharmacy_id
    const reqMedicineId = req.params.medicine_id
    var obj = {
      'medicine_id': reqMedicineId,
      'pharmacy_id': reqPharmacyId
    }

    PharmacyMedicine.create(obj, function(err, newPharmacyMedicine){
      if (err){
        console.log(err);
        return res.status(400).json("Bad Request");
      }
      if (newPharmacyMedicine){
        res.status(201).json(newPharmacyMedicine)
      }
    });
  })

  server.get('/api/pharmacies/:pharmacy_id/inventory/medicines/', isLoggedin, async function(req, res, next) {
    const reqPharmacyId = req.params.pharmacy_id
    var query = PharmacyMedicine.where({ pharmacy_id: reqPharmacyId });
    var items = [];

    await query.find(async function (err, medicineid_list) {
      console.log(medicineid_list);
      for (var i=0; i<medicineid_list.length; i++) {
        var currItem = medicineid_list[i];

        var query = Medicine.where({ _id: currItem.medicine_id });
        var medicine = await query.findOne();
        items.push(medicine);
      }  
      return res.status(200).json(items); 
    });
  })
}
