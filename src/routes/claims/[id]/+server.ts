import knex, { QueryBuilder } from 'knex';
import { json } from '@sveltejs/kit';
import type { Request } from '@sveltejs/kit';

interface Result {
    id: number;
    claimant_name?: string;
    parking_space_availability_id?: number;
    claimed?: number;
}

interface ResponseBody {
    success: boolean;
    data: Result[];
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

export async function GET({ params }: { params: { id: string } }) {
    let parking_space_claims: Result[] = await db < Result > ('parking_space_claims')
        .select('*')
        .where('id', '=', params.id)
        .then((data: Result[]) => {
            return data;
        })
        .catch((err: Error) => console.log(err));

    const responseBody: ResponseBody = {
        success: true,
        data: parking_space_claims
    };

    const response: Response = {
        status: 200,
        body: responseBody
    };

    return json(response);
}