module.exports = function(server) {
  const { isLoggedin } = require('../route_utils')
  const Medicine = require('../../database/models/medicine')

  server.post('/api/medicines/', isLoggedin, async function(req, res, next) {
    const reqMedicine = req.body
    Medicine.create(reqMedicine, function(err, newMedicine){
      if (err){
        console.log(err);
        return res.status(400).json("Bad Request");
      }
      if (newMedicine){
        res.status(201).json(newMedicine)
      }
    });
  })

  server.get('/api/medicines/:medicine_id', isLoggedin, async function(req, res, next) {
    const reqMedicineId = req.params.medicine_id
    var query  = Medicine.where({ _id: reqMedicineId });
    query.findOne(function (err, medicine) {
      if (medicine) {
        return res.status(200).json(medicine)
      }
      return res.status(404).json("Not Found")
    });
  })

  server.get('/api/medicines/', isLoggedin, async function(req, res, next) {
    Medicine.find({}, function (err, medicine_list) {
      return res.status(200).json(medicine_list)
    });
  })
}
