import { Station } from './station.entity';
import { KeyAccount } from './key-account.entity';
import { Vehicle } from './vehicle.entity';
import { ConversionClient } from './conversion-client.entity';
import { ConversionVehicle } from './conversion-vehicle.entity';
export declare enum ClientType {
    REGULAR = "regular",
    KEY_ACCOUNT = "key_account"
}
export declare enum PaymentMethod {
    CASH = "CASH",
    CARD = "CARD",
    MPESA = "MPESA",
    CREDIT = "CREDIT",
    OTHER = "other"
}
export declare class Sale {
    id: number;
    stationId: number;
    station?: Station;
    clientType: ClientType;
    keyAccountId?: number;
    keyAccount?: KeyAccount;
    vehicleId?: number;
    vehicle?: Vehicle;
    conversionClientId?: number;
    conversionClient?: ConversionClient;
    conversionVehicleId?: number;
    conversionVehicle?: ConversionVehicle;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    paymentMethod?: PaymentMethod;
    saleDate: Date;
    referenceNumber?: string;
    notes?: string;
    imagePath?: string;
    createdBy?: number;
    createdAt: Date;
    updatedAt: Date;
}
