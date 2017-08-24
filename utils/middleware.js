const jwt = require('jsonwebtoken');
const app = require('../server.js');

const checkAuth = (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }
  next();

  // const token = req.query.token || req.params.token;
  //
  // if (!token) {
  //   return res.status(403).json({ error: 'You must be authorized to hit this endpoint.' });
  // }
  //
  // try {
  //   const decoded = jwt.verify(token, app.get('secretKey'));
  //
  //   if (decoded.admin) {
  //     return next();
  //   }
  //
  //   return res.status(403).json({ error: 'You must be an admin to hit this endpoint.' });
  //
  // }catch(err) {
  //   return res.status(403).json({ error: 'Invalid token' });
  // }
};

module.exports = checkAuth;
