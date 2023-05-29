exports.up = async function (knex) {
    await knex('parking_spaces').where({ id: 1 }).update({ name: 'Pelle', color: 'red' });
    await knex('parking_spaces').where({ id: 2 }).update({ name: 'Karin', color: 'blue' });
    await knex('parking_spaces').where({ id: 3 }).update({ name: 'Johan', color: 'green' });
    await knex('parking_spaces').where({ id: 4 }).update({ name: 'Dennis', color: 'yellow' });
};

exports.down = async function (knex) {
    await knex('parking_spaces').whereIn('id', [1, 2, 3, 4]).update({ name: null, color: null });
};
