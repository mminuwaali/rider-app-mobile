interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
    last_name: string;
    first_name: string;
};

interface IWallet {
    id: number;
    amount: string;
    updated_at: string;
    created_at: string;
    total_deposit: string;
    total_withdrawn: string;
}