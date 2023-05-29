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
    const { description } = await request.json();
    return json({ description }, { status: 200 });
    let data = {
        parking_space_id: request.body.selectedParkingSpace,
        date: request.body.date
    };

    await db('parking_space_availability')
        .insert(data)
        .then(() => console.log('Data inserted'))
        .catch((err) => console.log(err));

    return json({
        status: 200,
        body: {
            success: true,
            message: 'Data inserted successfully'
        }
    });
}
