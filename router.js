const express = require('express');
const betas = require('./controllers/betasController');

const router = express.Router();

router.get('/betas/', betas.index);
router.get('/betas/industry/:industry_id/', betas.indexByIndustry);
router.get('/betas/region/:region_id/', betas.indexByRegion);
router.get('/betas/industry/:industry_id/region/:region_id/', betas.indexByIndustryRegion);

module.exports = router;
