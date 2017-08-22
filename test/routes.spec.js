/* eslint-env mocha */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(configuration);

const should = chai.should();
const expect = chai.expect;

describe('Dummy Test', () => {
  it('test', () => {
    expect(2).to.equal(2);
  });
});
