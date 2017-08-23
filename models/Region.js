const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

exports.getRegions = () => {
  return db('region').select('id', 'region').orderBy('id', 'asc');
};

exports.createRegion = (name) => {
  return db('region').insert({ region: name }, '*');
};

exports.updateRegion = (id, name) => {
  return db('region').where({ id }).update({ region: name }).returning('*');
};

exports.deleteRegion = (id) => {
  return db('total_beta').where({ region_id: id }).del()
    .then(() => db('region').where({ id }).del().returning('*'));
};
