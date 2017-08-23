const express = require('express');
const betas = require('./controllers/betasController');
const industry = require('./controllers/industryController');
const region = require('./controllers/regionController');

const router = express.Router();

// Industry
router.post('/industry', industry.create);
router.get('/industry', industry.index);
router.put('/industry/:id', industry.update);
router.delete('/industry/:id', industry.remove);

// Regions
router.post('/region', region.create);
router.get('/region', region.index);
router.put('/region/:id', region.update);
router.delete('/region/:id', region.remove);

// Betas
router.get('/betas', betas.index);
router.get('/betas/industry/:industry_id', betas.indexByIndustry);
router.get('/betas/region/:region_id', betas.indexByRegion);
router.get('/betas/industry/:industry_id/region/:region_id', betas.indexByIndustryRegion);

module.exports = router;
