module.exports = function(server) {
    const DeliveryRequest = require('../../database/models/delivery_request')
    server.post('/api/delivery_requests/', async function(req, res, next) {
      const reqDeliveryRequest = req.body
      DeliveryRequest.create(reqDeliveryRequest, function(err, newDeliveryRequest){
        if (err){
          console.log(err);
          return res.status(400).json("Bad Request");
        }
        if (newDeliveryRequest){
          res.status(201).json(newDeliveryRequest)
        }
      });
    })

    server.get('/api/delivery_requests/:delivery_request_id', async function(req, res, next) {
      const reqDeliveryRequestId = req.params.delivery_request_id
      var query  = DeliveryRequest.where({ _id: reqDeliveryRequestId });
      query.findOne(function (err, delivery_request) {
        if (delivery_request) {
          return res.status(200).json(delivery_request)
        }
        return res.status(404).json("Not Found")
      });
    })

    server.get('/api/delivery_requests/', async function(req, res, next) {
      DeliveryRequest.find({}, function (err, delivery_request_list) {
        return res.status(200).json(delivery_request_list)
      });
    })

    server.patch('/api/delivery_requests/:delivery_request_id', async function(req, res, next) {
      const reqDeliveryRequestId = req.params.delivery_request_id
      const reqStatus = req.body.status;
      var query  = DeliveryRequest.where({ _id: reqDeliveryRequestId });
      var update = { status: reqStatus };
      var options = { new: true };
      DeliveryRequest.findOneAndUpdate(query, update, options, function (err, delivery_request){
        if (delivery_request) {
          return res.status(200).json(delivery_request)
        }
        return res.status(404).json("Not Found")
      });
    })
}