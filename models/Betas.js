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
  return db('total_beta').where(industry_id).select().orderBy('id', 'asc');
};

exports.getBetasByRegion = (region_id) => {
  return db('total_beta').where(region_id).select().orderBy('id', 'asc');
};

exports.getBetasByIndustryRegion = (params) => {
  return db('total_beta').where(params).select().orderBy('id', 'asc');
};
