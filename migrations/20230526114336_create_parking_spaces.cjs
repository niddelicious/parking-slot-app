exports.up = function (knex) {
    return knex.schema.createTable('parking_spaces', function (table) {
        table.increments('id').primary();
        table.integer('owner_id').references('id').inTable('employees');
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('parking_spaces');
};
