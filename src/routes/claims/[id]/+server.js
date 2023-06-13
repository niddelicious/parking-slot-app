import knex from 'knex';
import { json } from '@sveltejs/kit'

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    useNullAsDefault: true
});

export async function GET({ params }) {
    let parking_space_claims = await db.select('*').from('parking_space_claims').where('id', '=', params.id);
    return json(parking_space_claims);
}