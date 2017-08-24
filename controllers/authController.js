const jwt = require('jsonwebtoken');
const app = require('../server.js');

exports.getToken = (req, res) => {
  console.log('auth');
  // const { email, appName } = req.body;
  // const payload = {
  //   email,
  //   appName,
  //   admin: email.includes('@byob.com'),
  // };
  // const token = jwt.sign(payload, app.get(process.env.SECRET_KEY), { expiresIn: '48h' });
  //
  // res.status(201).json({ token });
};
