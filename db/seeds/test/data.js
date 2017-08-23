/* eslint func-names: ["error", "never"] */

const industry = require('../../../data/json/industry');
const regions = require('../../../data/json/regions');
const total_beta = require('../../../data/json/total_beta');

const createIndustry = (knex, array) => {
  if (array.length < 1) {
    return array;
  }
  const name = array.shift();

  return knex('industry').insert({ name })
    .then(() => createIndustry(knex, array));
};

const createRegions = (knex, array) => {
  if (array.length < 1) {
    return array;
  }
  const region = array.shift();

  return knex('regions').insert({ region })
    .then(() => createRegions(knex, array));
};

const createBeta = (knex, {
  id,
  industry_id,
  num_firms,
  average_unlevered_beta,
  average_levered_beta,
  average_corr_market,
  total_unlevered_beta,
  total_levered_beta,
  region_id,
}) => knex('total_beta').insert({
  id,
  industry_id,
  num_firms,
  average_unlevered_beta,
  average_levered_beta,
  average_corr_market,
  total_unlevered_beta,
  total_levered_beta,
  region_id,
})
  .then(() => 'Created');

exports.seed = function (knex, Promise) {
  return knex('total_beta').del()
    .then(() => knex('regions').del())
    .then(() => knex('industry').del())
    .then(() => createIndustry(knex, [...industry]))
    .then(() => createRegions(knex, [...regions]))
    .then(() => Promise.all(total_beta.map(e => createBeta(knex, e))))
    // eslint-disable-next-line
    .then(() => console.log('done'))
    // eslint-disable-next-line
    .catch(err => console.log(err));
};
