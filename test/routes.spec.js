const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const environment = process.env.NODE_ENV;
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const chaiHttp = require('chai-http');
const server = require('../server');
