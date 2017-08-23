const Betas = require('../models/Betas');

exports.index = (req, res) => {
  if (Object.keys(req.query).length) {
    return Betas.queryBetas(req.query)
      .then((betas) => {
        if (!betas.length) {
          return res.status(404).json({ error: 'Betas not found' });
        }

        return res.status(200).json(betas);
      })
      .catch(error => res.status(500).json({ error }));
  }

  return Betas.getBetas()
    .then(betas => res.status(200).json(betas))
    .catch(error => res.status(500).json({ error }));
};

exports.indexByIndustry = (req, res) => {
  const { industry_id } = req.params;

  Betas.getBetasByIndustry({ industry_id })
    .then((betas) => {
      if (!betas.length) {
        return res.status(404).json({ error: 'Beta not found' });
      }

      return res.status(200).json(betas);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.indexByRegion = (req, res) => {
  const { region_id } = req.params;

  Betas.getBetasByRegion({ region_id })
    .then((betas) => {
      if (!betas.length) {
        return res.status(404).json({ error: 'Beta not found' });
      }

      return res.status(200).json(betas);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.indexByIndustryRegion = (req, res) => {
  const { industry_id, region_id } = req.params;

  Betas.getBetasByIndustryRegion({ industry_id, region_id })
    .then((betas) => {
      if (!betas.length) {
        return res.status(404).json({ error: 'Beta not found' });
      }

      return res.status(200).json(betas);
    })
    .catch(error => res.status(500).json({ error }));
};
