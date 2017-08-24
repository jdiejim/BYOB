const jwt = require('jsonwebtoken');
const app = require('../server.js');

exports.getToken = (req, res) => {
  const missingParams = [];

  ['email', 'appName'].forEach((required) => {
    if (!req.body[required]) {
      missingParams.push(required);
    }
  });

  if (missingParams.length) {
    const errorMsg = missingParams.reduce((str, e) => {
      let message = str;

      message += `param: ${e} `;
      return message;
    }, 'Error missing: ');

    return res.status(422).json({ error: errorMsg });
  }

  const { email, appName } = req.body;
  const payload = { email, appName, admin: email.includes('@byob.com') };
  const token = jwt.sign(payload, app.get(process.env.SECRET_KEY), { expiresIn: '48h' });

  return res.status(201).json({ token });
};
