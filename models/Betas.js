const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

exports.getBetas = () => {
  return db('total_beta').select().orderBy('id', 'asc');
};

exports.queryBetas = (query) => {
  return db('total_beta').where(query).select().orderBy('id', 'asc');
};

exports.getBetasByIndustry = (industry_id) => {
  return db('total_beta')
    .join('industry', 'industry.id', '=', 'total_beta.industry_id')
    .join('region', 'region.id', '=', 'total_beta.region_id')
    .where(industry_id)
    .select();
};

exports.getBetasByRegion = (region_id) => {
  return db('total_beta')
    .join('industry', 'industry.id', '=', 'total_beta.industry_id')
    .join('region', 'region.id', '=', 'total_beta.region_id')
    .where(region_id)
    .select();
};

exports.getBetasByIndustryRegion = (params) => {
  return db('total_beta')
    .join('industry', 'industry.id', '=', 'total_beta.industry_id')
    .join('region', 'region.id', '=', 'total_beta.region_id')
    .where(params)
    .select();
};
