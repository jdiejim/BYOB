/* eslint func-names: ["error", "never"] */

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('regions', (table) => {
      table.integer('id').primary();
      table.string('region');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('regions'),
  ]);
};
