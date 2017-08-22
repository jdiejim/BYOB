const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

const db = require('knex')(configuration);

exports.getIndustries = () => db('industry').select();
