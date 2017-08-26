const express = require('express');
const betas = require('./controllers/betasController');
const industry = require('./controllers/industryController');
const region = require('./controllers/regionController');
const auth = require('./controllers/authController');
const { checkAuthAdmin, checkAuth } = require('./utils/middleware');

const router = express.Router();

// Auth
router.post('/authentication', auth.getToken);

// Industry
router.post('/industry', checkAuthAdmin, industry.create);
router.get('/industry', checkAuth, industry.index);
router.put('/industry/:id', checkAuthAdmin, industry.update);
router.delete('/industry/:id', checkAuthAdmin, industry.remove);

// Regions
router.post('/region', checkAuthAdmin, region.create);
router.get('/region', checkAuth, region.index);
router.put('/region/:id', checkAuthAdmin, region.update);
router.delete('/region/:id', checkAuthAdmin, region.remove);

// Betas
router.get('/betas', checkAuth, betas.index);
router.get('/betas/:id', checkAuth, betas.indexById);
router.patch('/betas/:id', checkAuthAdmin, betas.update);
router.get('/betas/industry/:industry_id', checkAuth, betas.indexByIndustry);
router.get('/betas/region/:region_id', checkAuth, betas.indexByRegion);
router.get('/betas/industry/:industry_id/region/:region_id', checkAuth, betas.indexByIndustryRegion);

module.exports = router;
