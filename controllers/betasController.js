const Betas = require('../models/Betas');

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

exports.index = (req, res) => {
  if (Object.keys(req.query).length) {
    return Betas.queryBetas(req.query)
      .then((betas) => {
        if (betas === 'bad') {
          return res.status(400).json({ error: 'Bad request' });
        }

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

exports.create = (req, res) => {
  const missingParams = getMissingParams(req.body, ['industry', 'region']);

  if (missingParams.length) {
    return res.status(422).json({ error: getErrorMsg(missingParams) });
  }

  return Betas.createBeta(req.body)
    .then((beta) => {
      if (beta === 'industry') {
        return res.status(400).json({ error: 'Bad request: industry syntax' });
      }

      if (beta === 'region') {
        return res.status(400).json({ error: 'Bad request: region syntax' });
      }

      return res.status(201).json(beta);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.indexById = (req, res) => {
  return Betas.getBetaById(req.params.id)
    .then((betas) => {
      if (!betas.length) {
        return res.status(404).json({ error: 'Beta not found' });
      }

      return res.status(200).json(betas);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.update = (req, res) => {
  const { params: { id }, body } = req;

  return Betas.updateBeta(id, body)
    .then((beta) => {
      if (beta === 'bad') {
        return res.status(400).json({ error: 'Bad request, check params syntax' });
      }

      if (!beta.length) {
        return res.status(404).json({ error: 'Beta not found' });
      }
      return res.status(200).json(beta);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.indexByIndustry = (req, res) => {
  const { industry_id } = req.params;

  Betas.getBetasByIndustry({ industry_id })
    .then((betas) => {
      if (!betas.length) {
        return res.status(404).json({ error: 'Betas not found' });
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
        return res.status(404).json({ error: 'Betas not found' });
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

exports.remove = (req, res) => {
  const { id } = req.params;

  Betas.deleteBeta(id)
    .then((beta) => {
      if (!beta.length) {
        return res.status(404).json({ error: 'Beta not found' });
      }
      return res.status(200).json(beta);
    })
    .catch(error => res.status(500).json({ error }));
};
