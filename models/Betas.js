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

const paramNames = {
  industry: 'ok',
  region: 'ok',
  num_firms: 'ok',
  average_unlevered_beta: 'ok',
  average_levered_beta: 'ok',
  average_corr_market: 'ok',
  total_unlevered_beta: 'ok',
  total_levered_beta: 'ok',
};

const validateParams = (params) => {
  const keys = Object.keys(params);

  for (let i = 0; i < keys.length; i += 1) {
    if (!paramNames[keys[i]]) {
      return false;
    }
  }

  return true;
};

const updateSingleCase = (id, table, params) => {
  return db(table).where({ [table]: params[table] }).select('id')
    .then((data) => {
      if (!data.length) {
        return new Promise(res => res('bad'));
      }

      const newParams = Object.assign(params, { [`${table}_id`]: data[0].id });

      return db('total_beta').where({ id }).update(newParams).returning('*');
    });
};

const updateMultipleCase = (id, params) => {
  return db('industry').where({ industry: params.industry }).select('id')
    .then((data) => {
      if (!data.length) {
        return new Promise(res => res('bad'));
      }
      const industryParams = Object.assign(params, { industry_id: data[0].id });

      return db('region').where({ region: industryParams.region }).select('id')
        .then((regionData) => {
          if (!regionData.length) {
            return new Promise(res => res('bad'));
          }
          const newParams = Object.assign(params, { region_id: regionData[0].id });

          return db('total_beta').where({ id }).update(newParams).returning('*');
        });
    });
};

exports.getBetas = () => {
  return db('total_beta').select().orderBy('id', 'asc');
};

exports.getBetaById = (id) => {
  return db('total_beta').where({ id }).select();
};

exports.queryBetas = (query) => {
  const params = getQueryParams(query);
  const sortQuery = query.sort ? getSortQuery(query.sort) : null;

  if (!sortQuery) {
    return db('total_beta').where(params).select().orderBy('id', 'asc');
  }

  if (Object.keys(params).length === 2) {
    return db('total_beta').where(params).select().orderBy('id', 'asc');
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

exports.updateBeta = (id, params) => {
  if (!validateParams(params)) {
    return new Promise(res => res('bad'));
  }

  if (params.industry && params.region) {
    return updateMultipleCase(id, params);
  } else if (params.industry && !params.region) {
    return updateSingleCase(id, 'industry', params);
  } else if (!params.industry && params.region) {
    return updateSingleCase(id, 'region', params);
  }

  return db('total_beta').where({ id }).update(params).returning('*');
};

exports.deleteBeta = (id) => {
  return db('total_beta').where({ id }).del().returning('*');
};
