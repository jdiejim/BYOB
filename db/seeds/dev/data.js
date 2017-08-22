/* eslint func-names: ["error", "never"] */
/* eslint no-console: off */
const industry = require('../../../data/json/industry');
const regions = require('../../../data/json/regions');
const total_beta = require('../../../data/json/total_beta');

const createIndustry = (knex, { id, name }) => knex('industry').insert({ id, name }).then(() => 'Created');
const createRegions = (knex, { id, region }) => knex('regions').insert({ id, region }).then(() => 'Created');
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
    .then(() => Promise.all(industry.map(e => createIndustry(knex, e))))
    .then(() => Promise.all(regions.map(e => createRegions(knex, e))))
    .then(() => Promise.all(total_beta.map(e => createBeta(knex, e))))
    .then(() => console.log('done'))
    .catch(err => console.log(err));
};
