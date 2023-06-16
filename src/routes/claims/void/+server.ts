import knex from 'knex';
import { json } from '@sveltejs/kit';

interface IncomingData {
    id: number;
    void_name: string;
}

interface ResultA {
    id: number;
    claimant_name?: string;
    parking_space_availability_id?: number;
    claimed?: number;
    claim_voided?: number;
}

interface ResultB {
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

    let result_a: ResultA[] = await db<ResultA>('parking_space_claims')
        .update({ claim_voided: 1 })
        .where('id', '=', incomingData.id)
        .andWhere('claimant_name', '=', incomingData.void_name)
        .andWhere('claim_voided', '=', 0)
        .returning(['id', 'claimant_name', 'parking_space_availability_id', 'claim_voided'])
        .then((data: ResultA[]) => {
            return data;
        })
        .catch((err: Error) => {
            console.log(err)
            return [];
        });

    let result_b: ResultB[] = await db<ResultB>('parking_space_availability')
        .update({ claimed: 0 })
        .where('id', '=', result_a[0].id)
        .returning(['id', 'claimed'])
        .then((data: ResultB[]) => {
            return data;
        })
        .catch((err: Error) => {
            console.log(err)
            return [];
        });

    const responseBody: ResponseBody = {
        success: true,
        message: `Parkering mackulerad för ${incomingData.void_name}`
    };

    const response: Response = {
        status: 200,
        body: responseBody
    };

    return json(response);
}