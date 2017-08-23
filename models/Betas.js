const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

exports.getBetas = () => {
  return db('total_beta').select();
};

exports.queryBetas = (query) => {
  return db('total_beta')
    .join('industry', 'industry.id', '=', 'total_beta.industry_id')
    .join('region', 'region.id', '=', 'total_beta.region_id')
    .where(query)
    .select();
};

exports.getBetasByIndustry = (industry_id) => {
  return db('total_beta').where(industry_id).select();
};

exports.getBetasByRegion = (region_id) => {
  return db('total_beta').where(region_id).select();
};

exports.getBetasByIndustryRegion = (params) => {
  return db('total_beta').where(params).select();
};
