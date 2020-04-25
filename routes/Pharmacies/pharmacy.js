module.exports = function(server) {
  const { isLoggedin } = require('../route_utils')

  const Pharmacy = require('../../database/models/pharmacy')
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
}
