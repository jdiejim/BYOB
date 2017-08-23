const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

exports.getRegions = () => {
  return db('regions').select(['id', 'name']).orderBy('id', 'asc');
};

exports.createRegion = (name) => {
  return db('regions').insert(name, '*');
};

exports.updateRegion = (id, name) => {
  return db('regions').where({ id }).update({ name }).returning('*');
};

exports.deleteRegion = (id) => {
  return db('total_beta').where({ region_id: id }).del()
    .then(() => db('regions').where({ id }).del().returning('*'));
};
