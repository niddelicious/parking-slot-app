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
    let data = {
        parking_space_id: incomingData.parkingSpace,
        date: incomingData.date
    };

    const [insertedData] = await db('parking_space_availability')
        .insert(data)
        .returning(['parking_space_id', 'date'])
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));

    const { parking_space_id, date } = insertedData;

    const humanDate = new Date(date).toLocaleString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return json({
        status: 200,
        body: {
            success: true,
            message: `Parkering öppnad för parkeringsplats ${parking_space_id} den ${humanDate}`
        }
    });
}
