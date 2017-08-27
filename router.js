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
router.get('/industry', checkAuth, industry.index);
router.post('/industry', checkAuthAdmin, industry.create);
router.put('/industry/:id', checkAuthAdmin, industry.update);
router.delete('/industry/:id', checkAuthAdmin, industry.remove);

// Regions
router.get('/region', checkAuth, region.index);
router.post('/region', checkAuthAdmin, region.create);
router.put('/region/:id', checkAuthAdmin, region.update);
router.delete('/region/:id', checkAuthAdmin, region.remove);

// Betas
router.get('/betas', checkAuth, betas.index);
router.post('/betas/', checkAuthAdmin, betas.create);
router.get('/betas/:id', checkAuth, betas.indexById);
router.patch('/betas/:id', checkAuthAdmin, betas.update);
router.delete('/betas/:id', checkAuthAdmin, betas.remove);
router.get('/betas/industry/:industry_id', checkAuth, betas.indexByIndustry);
router.get('/betas/region/:region_id', checkAuth, betas.indexByRegion);
router.get('/betas/industry/:industry_id/region/:region_id', checkAuth, betas.indexByIndustryRegion);

module.exports = router;
