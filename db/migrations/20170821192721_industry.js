/* eslint func-names: ["error", "never"] */

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('industry', (table) => {
      table.increments('id').primary();
      table.string('industry');

      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('industry'),
  ]);
};
