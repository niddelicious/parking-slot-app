import knex from 'knex';
import { json } from '@sveltejs/kit';

interface IncomingData {
    parkingSpace: number;
    date: string;
}

interface InsertedData {
    parking_space_id: number;
    date: string;
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
    let data: InsertedData = {
        parking_space_id: incomingData.parkingSpace,
        date: incomingData.date
    };

    //confirm that the availability is not already in the database
    const availability: InsertedData[] = await db<InsertedData>('parking_space_availability')
        .select('parking_space_id', 'date')
        .where('parking_space_id', '=', data.parking_space_id)
        .andWhere('date', '=', data.date)
        .then((data: InsertedData[]) => {
            return data;
        })
        .catch((err: Error) => {
            console.log(err)
            return [];
        });

    if (availability.length > 0) {
        const responseBody: ResponseBody = {
            success: false,
            message: `Parkering redan öppnad för parkeringsplats ${data.parking_space_id} den ${data.date}`
        };

        const response: Response = {
            status: 200,
            body: responseBody
        };

        return json(response);
    }


    const [insertedData]: InsertedData[] = await db<InsertedData>('parking_space_availability')
        .insert(data)
        .returning(['parking_space_id', 'date'])
        .then((data: InsertedData[]) => {
            return data;
        })
        .catch((err: Error) => {
            console.log(err)
            return [];
        });

    const { parking_space_id, date } = insertedData;

    const humanDate = new Date(date).toLocaleString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const responseBody: ResponseBody = {
        success: true,
        message: `Parkering öppnad för parkeringsplats ${parking_space_id} den ${humanDate}`
    };

    const response: Response = {
        status: 200,
        body: responseBody
    };

    return json(response);
}