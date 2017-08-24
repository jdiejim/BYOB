const jwt = require('jsonwebtoken');

const getErrorMsg = params => params.reduce((str, e) => {
  let message = str;

  message += `param: ${e} `;
  return message;
}, 'Error missing: ');

const getMissingParams = (body, params) => {
  const missing = [];

  params.forEach((required) => {
    if (!body[required]) {
      missing.push(required);
    }
  });

  return missing;
};

exports.getToken = (req, res) => {
  const missingParams = getMissingParams(req.body, ['email', 'app']);

  if (missingParams.length) {
    return res.status(422).json({ error: getErrorMsg(missingParams) });
  }

  const payload = Object.assign(req.body, { admin: req.body.email.includes('@byob.io') });
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '48h' });

  return res.status(201).json({ token });
};
