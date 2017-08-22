const Industry = require('../models/Industry');

exports.index = (req, res) => {
  Industry.getIndustries()
    .then(industries => res.status(200).json({ industries }))
    .catch(error => res.status(500).json({ error }));
};
