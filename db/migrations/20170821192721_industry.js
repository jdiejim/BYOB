/* eslint func-names: ["error", "never"] */

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('industry', (table) => {
      table.integer('id').primary();
      table.string('name');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('industry'),
  ]);
};
