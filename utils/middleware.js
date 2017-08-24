const jwt = require('jsonwebtoken');

exports.checkAuthAdmin = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ error: 'You must be authorized to hit this endpoint' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.admin) {
      return next();
    }

    return res.status(403).json({ error: 'You must be an admin to hit this endpoint' });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

exports.checkAuth = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ error: 'You must be authorized to hit this endpoint' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      return next();
    }

    return res.status(403).json({ error: 'Invalid token' });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
