interface IUser {
    id: number;
    email: string;
    profile?: string;
    username: string;
    last_name: string;
    first_name: string;
    role: "rider" | "client";
    gender?: "male" | "female";
};

interface IWallet {
    id: number;
    amount: string;
    updated_at: string;
    created_at: string;
    total_deposit: string;
    total_withdrawn: string;
}