export declare class KeyAccount {
    id: number;
    name: string;
    email: string;
    contact: string;
    account_number: string | null;
    type: 'client' | 'key_account';
    description: string | null;
    region: string | null;
    is_active: number;
    created_at: Date;
    updated_at: Date;
}
