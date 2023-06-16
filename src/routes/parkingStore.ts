import { writable } from 'svelte/store';
import axios from 'axios';
import type { ParkingAvailability, ParkingSpace, ParkingClaim } from './parkingTypes';

interface ParkingStore {
    parkingSpaces: ParkingSpace[];
    availability: ParkingAvailability[];
    parkingClaims: ParkingClaim[];
    selectedDate: Date;  // Added this field for storing the selected date
}

export const parkingStore = writable<ParkingStore>({
    parkingSpaces: [],
    availability: [],
    parkingClaims: [],
    selectedDate: new Date()  // You can initialize this with any default date you want
});

export function fetchInitialData() {
    axios.get<ParkingSpace[]>('/parkingSpaces')
        .then(({ data: parkingSpaces }) => {
            axios.get<ParkingAvailability[]>('/availability')
                .then(({ data: availability }) => {
                    axios.get<ParkingClaim[]>('/claims')
                        .then(({ data: parkingClaims }) => {
                            parkingStore.update(store => {
                                store.parkingSpaces = parkingSpaces;
                                store.availability = availability;
                                store.parkingClaims = parkingClaims;
                                return store;
                            });
                        })
                        .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}


export async function fetchNewData() {
    console.log('fetchNewData');
    try {
        const { data: parkingSpaces } = await axios.get<ParkingSpace[]>('/parkingSpaces');
        const { data: availability } = await axios.get<ParkingAvailability[]>('/availability');
        const { data: parkingClaims } = await axios.get<ParkingClaim[]>('/claims');
        parkingStore.update(store => {
            store.parkingSpaces = parkingSpaces;
            store.availability = availability;
            store.parkingClaims = parkingClaims;
            return store;
        });
        console.log('fetchNewData done');
        console.log(parkingStore);
    } catch (error) {
        console.error(error);
    }
}
