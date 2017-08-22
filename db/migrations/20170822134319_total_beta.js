/* eslint func-names: ["error", "never"] */

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('total_beta', (table) => {
      table.integer('id').primary();
      table.integer('industry_id');
      table.foreign('industry_id').references('industry.id');
      table.integer('num_firms');
      table.float('average_unlevered_beta');
      table.float('average_levered_beta');
      table.float('average_corr_market');
      table.float('total_unlevered_beta');
      table.float('total_levered_beta');
      table.integer('region_id');
      table.foreign('region_id').references('regions.id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('total_beta'),
  ]);
};
