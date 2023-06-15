import knex, { QueryBuilder } from 'knex';
import { json } from '@sveltejs/kit';
import type { Request } from '@sveltejs/kit';

interface IncomingData {
    claimant_name: string;
    parking_space_availability_id: number;
}

interface Result {
    id: number;
    claimant_name?: string;
    parking_space_availability_id?: number;
    claimed?: number;
}

interface ResponseBody {
    success: boolean;
    message: string;
}

interface Response {
    status: number;
    body: ResponseBody;
}

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    useNullAsDefault: true
});

export async function POST({ request }: { request: Request }) {
    let incomingData: IncomingData = await request.json();

    let result_a: Result[] = await db<Result>('parking_space_claims')
        .insert({ claimant_name: incomingData.claimant_name, parking_space_availability_id: incomingData.parking_space_availability_id })
        .returning(['id', 'claimant_name', 'parking_space_availability_id'])
        .then((data: Result[]) => {
            return data;
        })
        .catch((err: Error) => console.log(err));
    let result_b: Result[] = await db<Result>('parking_space_availability')
        .update({ claimed: result_a[0].id })
        .where('id', '=', incomingData.parking_space_availability_id)
        .returning(['id', 'claimed'])
        .then((data: Result[]) => {
            return data;
        })
        .catch((err: Error) => console.log(err));

    const responseBody: ResponseBody = {
        success: true,
        message: `Parkering reserverad för ${incomingData.claimant_name}`
    };

    const response: Response = {
        status: 200,
        body: responseBody
    };

    return json(response);
}