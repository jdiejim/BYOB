const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

exports.getBetas = () => db('total_beta').select();

exports.getBetasByIndustry = industry_id => db('total_beta').where(industry_id).select();

exports.getBetasByRegion = region_id => db('total_beta').where(region_id).select();

exports.getBetasByIndustryRegion = params => db('total_beta').where(params).select();
