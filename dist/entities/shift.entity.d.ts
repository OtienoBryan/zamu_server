export declare class Shift {
    id: number;
    date: Date;
    time: string;
    userId: number | null;
    userName: string;
    station_id: number;
    station_name: string;
    status: number;
    checkInTime: Date | null;
    latitude: number | null;
    longitude: number | null;
    imageUrl: string | null;
    notes: string | null;
    pump_number: number;
    checkoutLatitude: number | null;
    checkoutLongitude: number | null;
    checkoutTime: Date | null;
    showUpdateLocation: number;
    routeId: number | null;
    createdAt: string;
    updatedAt: string;
    outlet_address: string;
    approvedAt: string;
}
