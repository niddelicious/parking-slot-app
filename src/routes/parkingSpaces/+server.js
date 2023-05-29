import knex from 'knex';
import { json } from '@sveltejs/kit'

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    useNullAsDefault: true
});

export async function GET(req) {
    const parkingSpaces = await db.select('*').from('parking_spaces');
    return json(parkingSpaces);
}
