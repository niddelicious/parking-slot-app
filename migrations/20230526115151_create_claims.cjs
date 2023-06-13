exports.up = function (knex) {
    return knex.schema.createTable('parking_space_claims', function (table) {
        table.increments('id').primary();
        table.string('claimant_name');
        table.integer('parking_space_availability_id').references('id').inTable('parking_space_availability');
        table.boolean('claim_voided').defaultTo(false);
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('parking_space_claims');
};
