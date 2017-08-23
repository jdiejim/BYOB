const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

exports.getIndustries = () => {
  return db('industry').select(['id', 'name']).orderBy('id', 'asc');
};

exports.createIndustry = (name) => {
  return db('industry').insert(name, '*');
};

exports.updateIndustry = (id, name) => {
  return db('industry').where({ id }).update({ name }).returning('*');
};

exports.deleteIndustry = (id) => {
  return db('total_beta').where({ industry_id: id }).del()
    .then(() => db('industry').where({ id }).del().returning('*'));
};
