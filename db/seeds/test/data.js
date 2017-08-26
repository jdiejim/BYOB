/* eslint func-names: ["error", "never"] */
/* eslint no-console: "off" */

const industry = require('../../../test/fixtures/industry');
const region = require('../../../test/fixtures/region');
const total_beta = require('../../../test/fixtures/total_beta');

const createRegion = (knex, array) => {
  if (array.length < 1) {
    return array;
  }
  const name = array.shift();

  return knex('region').insert({ region: name })
    .then(() => createRegion(knex, array));
};

const getBetaObj = (obj, industry_id, region_id) => Object.assign(obj, { industry_id, region_id });

const createBetas = (knex, name, industry_id) => {
  return Promise.all(
    total_beta.filter(e => e.industry === name)
      .map(beta => knex('region').where({ region: beta.region }).select('id')
          .then(data => knex('total_beta').insert(getBetaObj(beta, industry_id, data[0].id)))))
          .then(() => 'done');
};

const createIndustry = (knex, array) => {
  if (array.length < 1) {
    return array;
  }
  const name = array.shift();

  return knex('industry').insert({ industry: name }, ['id', 'industry'])
    .then(data => createBetas(knex, data[0].industry, data[0].id))
    .then(() => createIndustry(knex, array));
};

exports.seed = function (knex) {
  return knex('total_beta').del()
    .then(() => knex('region').del())
    .then(() => knex('industry').del())
    .then(() => createRegion(knex, [...region]))
    .then(() => createIndustry(knex, [...industry]))
    .then(() => 'done')
    .catch(err => console.log(err));
};
