export interface ParkingAvailability {
    id: number;
    parking_space_id: number;
    date: string;
    claimed: number;
}

export interface ParkingSpace {
    id: number;
    name: number;
    color: string;
}

export interface ParkingClaim {
    id: number;
    claimant_name: string;
    parking_space_availability_id: number;
    claim_voided: boolean
}