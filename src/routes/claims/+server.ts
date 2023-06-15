import knex, { QueryBuilder } from 'knex';
import { json } from '@sveltejs/kit';
import dayjs from 'dayjs';
import type { Request } from '@sveltejs/kit';
import type { ParkingClaim } from '../parkingTypes';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    useNullAsDefault: true
});

const today = dayjs().format('YYYY-MM-DD');

export async function GET(_request: Request) {
    const parkingSpaceClaims: ParkingClaim[] = await db<ParkingClaim>('parking_space_claims')
        .select('id', 'claimant_name', 'parking_space_availability_id', 'claim_voided')
        .where('claim_voided', '=', 0);

    return json(parkingSpaceClaims);
}