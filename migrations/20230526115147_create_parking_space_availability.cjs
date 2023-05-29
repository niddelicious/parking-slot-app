exports.up = function (knex) {
    return knex.schema.createTable('parking_space_availability', function (table) {
        table.increments('id').primary();
        table.integer('parking_space_id').references('id').inTable('parking_spaces');
        table.date('date');
        table.boolean('is_available');
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('parking_space_availability');
};
