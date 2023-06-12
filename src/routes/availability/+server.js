import knex from 'knex';
import { json } from '@sveltejs/kit'
import dayjs from 'dayjs';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    useNullAsDefault: true
});

const today = dayjs().format('YYYY-MM-DD');

export async function GET() {
    const availableParkingSpaces = await db.column('parking_space_id', 'date').select().from('parking_space_availability').where('date', '>=', today);
    return json(availableParkingSpaces);
}
