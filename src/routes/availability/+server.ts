import knex from 'knex';
import { json } from '@sveltejs/kit';
import dayjs from 'dayjs';
import type { ParkingAvailability } from '../parkingTypes';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    useNullAsDefault: true
});

const today = dayjs().format('YYYY-MM-DD');

export async function GET(_request: Request) {
    const availableParkingSpaces: ParkingAvailability[] = await db<ParkingAvailability>('parking_space_availability')
        .select('id', 'parking_space_id', 'date', 'claimed')
        .where('date', '>=', today);

    return json(availableParkingSpaces);
}