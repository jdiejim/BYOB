const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

const getQueryParams = (params) => {
  const obj = {};

  if (params.industry) {
    obj.industry = params.industry;
  }

  if (params.region) {
    obj.region = params.region;
  }

  return obj;
};

const getSortQuery = (query) => {
  const queries = query.split('-');

  if (queries.length < 2) {
    return 'bad';
  }

  if (queries[1] === 'asc' || queries[1] === 'desc') {
    return { prop: queries[0], type: queries[1] };
  }

  return 'bad';
};

exports.getBetas = () => {
  return db('total_beta').select().orderBy('id', 'asc');
};

exports.queryBetas = (query) => {
  const params = getQueryParams(query);
  const sortQuery = query.sort ? getSortQuery(query.sort) : null;

  if (!sortQuery) {
    return db('total_beta').where(query).select().orderBy('id', 'asc');
  }

  if (Object.keys(params).length === 2) {
    return db('total_beta').where(params).select();
  }

  if (sortQuery === 'bad') {
    return new Promise(res => res(sortQuery));
  }

  if (!Object.keys(params).length) {
    return db('total_beta').select().orderBy(sortQuery.prop, sortQuery.type);
  }

  return db('total_beta').where(params).select().orderBy(sortQuery.prop, sortQuery.type);
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


// /companies?sort=rank_asc
//
// num_firms": 41,
//         "average_unlevered_beta": 0.910182,
//         "average_levered_beta": 1.363,
//         "average_corr_market": 0.183748,
//         "total_unlevered_beta": 4.95343,
//         "total_levered_beta": 7.41777,
//
//         "industry": "Advertising",
// "region": "US",
//
// sort
