module.exports = function(server) {
    const User = require('../../database/models/user')
    server.post('/api/users/', async function(req, res, next) {
      const reqUser = req.body
      User.create(reqUser, function(err, newUser){
        if (err){
          console.log(err);
          return res.status(400).json("Bad Request");
        }
        if (newUser){
          res.status(201).json(newUser)
        }
      });
    })

    server.get('/api/users/:user_name', async function(req, res, next) {
      const reqUserName = req.params.user_name
      var query  = User.where({ user_name: reqUserName });
      query.findOne(function (err, user) {
        if (user) {
          return res.status(200).json(user)
        }
        return res.status(404).json("Not Found")
      });
    })


}