module.exports = function(server) {
  const User = require('../../database/models/user')

  server.post('/api/sessions/', async function(req, res, next) {
    const reqUserName = req.body.user_name
    const reqPassword = req.body.password
    var query  = User.where({ user_name: reqUserName });
    query.findOne(function (err, user) {
      if (user) {
        if (user.password === reqPassword) {
          req.session.user_name = reqUserName
          return res.status(200).json(user)
        } else {
          return res.status(401).json({
            message: 'Access Denied',
            description: 'Invalid user_name or password'
          })
        }
      }
      return res.status(404).json({
        message: 'Not Found',
        description: 'The user_name you entered does not exist'
      })
    });
  })
}
