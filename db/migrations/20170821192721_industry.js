exports.up = function (knex, Promise) {
  return Promise.all([
    knex.createTable('industry', (table) => {
      table.increments('id').primary();
      table.string('name');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.dropTable('industry'),
  ]);
};
