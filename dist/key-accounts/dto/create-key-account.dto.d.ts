export declare class CreateKeyAccountDto {
    name: string;
    email: string;
    contact: string;
    account_number?: string;
    type?: 'client' | 'key_account';
    description?: string;
    region?: string;
    is_active?: number;
}
