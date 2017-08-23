/* eslint func-names: ["error", "never"] */
/* eslint no-console: "off" */

const industry = require('../../../data/json/industry');
const regions = require('../../../data/json/regions');
const total_beta = require('../../../data/json/total_beta');

const createSeed = (knex, array, table) => {
  if (array.length < 1) {
    return array;
  }
  const name = array.shift();

  return knex(table).insert({ name })
    .then(() => createSeed(knex, array, table));
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
    .then(() => createSeed(knex, [...industry], 'industry'))
    .then(() => createSeed(knex, [...regions], 'regions'))
    .then(() => Promise.all(total_beta.map(e => createBeta(knex, e))))
    .then(() => console.log('done'))
    .catch(err => console.log(err));
};
