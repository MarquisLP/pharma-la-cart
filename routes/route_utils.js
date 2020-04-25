module.exports = {
  isLoggedin: function (req, res, next) {
    if (req.session.user_name !== undefined) {
      next()
    } else {
      return res.status(401).json({
        messge: 'Access Denied',
        description: 'Please login to the system before accessing this resource'
      })
    }
  }
}
