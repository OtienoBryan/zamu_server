import { Region } from './region.entity';
export declare class Station {
    id: number;
    omc_id: number;
    name: string;
    address: string;
    longitude: string | null;
    latitude: string | null;
    regionId: number;
    region?: Region;
    contact: string | null;
    price: number | null;
    lpgQuantity: number;
}
