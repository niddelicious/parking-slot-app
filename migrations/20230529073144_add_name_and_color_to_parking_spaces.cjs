
exports.up = function (knex) {
    return knex.schema.table('parking_spaces', function (table) {
        table.string('name');
        table.string('color');
    });
};


exports.down = function (knex) {
    return knex.schema.table('parking_spaces', function (table) {
        table.dropColumn('name');
        table.dropColumn('color');
    });
};
