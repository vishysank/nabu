module.exports = {
  auth: function(credentials) {
    if (credentials.userName !== process.env.TEAM_USERNAME || credentials.password !== process.env.TEAM_PASSWORD) {
      return('Incorrect authentication details !');
    } else {
      return('');
    }
  },
  authCheck: function (req, res, next) {
    if (!req.session.userName) {
      res.redirect('/login');
      } else {
      next();
    }
  }
};
