const jwt = require('jsonwebtoken');
const app = require('../server.js');

exports.checkAuth = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ error: 'You must be authorized to hit this endpoint.' });
  }

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
