/* eslint func-names: ["error", "never"] */

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('total_beta', (table) => {
      table.increments('id').primary();
      table.integer('industry_id');
      table.foreign('industry_id').references('industry.id');
      table.string('industry');
      table.string('region');
      table.integer('num_firms');
      table.float('average_unlevered_beta');
      table.float('average_levered_beta');
      table.float('average_corr_market');
      table.float('total_unlevered_beta');
      table.float('total_levered_beta');
      table.integer('region_id');
      table.foreign('region_id').references('region.id');

      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('total_beta'),
  ]);
};
