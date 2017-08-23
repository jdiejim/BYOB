const Region = require('../models/Region');

exports.index = (req, res) => {
  Region.getRegions()
    .then(regions => res.status(200).json(regions))
    .catch(error => res.status(500).json({ error }));
};

exports.create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ error: 'Missing name parameter' });
  }

  return Region.createRegion(name)
    .then(region => res.status(201).json(region))
    .catch(error => res.status(500).json({ error }));
};

exports.update = (req, res) => {
  const { params: { id }, body: { name } } = req;

  if (!name) {
    return res.status(422).json({ error: 'Missing name parameter' });
  }

  return Region.updateRegion(id, name)
    .then((region) => {
      if (!region.length) {
        return res.status(404).json({ error: 'Not Found' });
      }
      return res.status(200).json(region);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.remove = (req, res) => {
  const { id } = req.params;

  Region.deleteRegion(id)
    .then((region) => {
      if (!region.length) {
        return res.status(404).json({ error: 'Not Found' });
      }
      return res.status(200).json(region);
    })
    .catch(error => res.status(500).json({ error }));
};
