import knex from 'knex';
import { json } from '@sveltejs/kit'

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    useNullAsDefault: true
});

export async function POST({ request }) {
    let incomingData = await request.json();

    let result_a = await db('parking_space_claims')
        .insert({ claimant_name: incomingData.claimant_name, parking_space_availability_id: incomingData.parking_space_availability_id })
        .returning(['id', 'claimant_name', 'parking_space_availability_id'])
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));
    let result_b = await db('parking_space_availability')
        .update({ claimed: result_a[0].id })
        .where('id', '=', incomingData.parking_space_availability_id)
        .returning(['id', 'claimed'])
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));

    return json({
        status: 200,
        body: {
            success: true,
            message: `Parkering reserverad för ${incomingData.claimant_name}`
        }
    });
}
