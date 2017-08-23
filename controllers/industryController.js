const Industry = require('../models/Industry');

exports.index = (req, res) => {
  Industry.getIndustries()
    .then(industry => res.status(200).json(industry))
    .catch(error => res.status(500).json({ error }));
};

exports.create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ error: 'Missing name parameter' });
  }

  return Industry.createIndustry(name)
    .then(industry => res.status(201).json(industry))
    .catch(error => res.status(500).json({ error }));
};

exports.update = (req, res) => {
  const { params: { id }, body: { name } } = req;

  if (!name) {
    return res.status(422).json({ error: 'Missing name parameter' });
  }

  return Industry.updateIndustry(id, name)
    .then((industry) => {
      if (!industry.length) {
        return res.status(404).json({ error: 'Not Found' });
      }
      return res.status(200).json(industry);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.remove = (req, res) => {
  const { id } = req.params;

  Industry.deleteIndustry(id)
    .then((industry) => {
      if (!industry.length) {
        return res.status(404).json({ error: 'Not Found' });
      }
      return res.status(200).json(industry);
    })
    .catch(error => res.status(500).json({ error }));
};
