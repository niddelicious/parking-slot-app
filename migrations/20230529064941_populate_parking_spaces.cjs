exports.up = async function (knex) {
    await knex('parking_spaces').insert([
        { owner_id: 1 },
        { owner_id: 2 },
        { owner_id: 3 },
        { owner_id: 4 }
    ]);
};

exports.down = async function (knex) {
    // The down migration needs to undo what the up migration did. In this case, we'll remove the parking spaces we inserted.
    await knex('parking_spaces').whereIn('owner_id', [1, 2, 3, 4]).del();
};
