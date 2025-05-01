interface IBase {
    id: number;
    created_at: string;
    updated_at: string;
}

interface IUser {
    id: number;
    email: string;
    password: string;
    profile?: string;
    username: string;
    last_name: string;
    first_name: string;
    role: "rider" | "client";
    gender?: "male" | "female";
};

interface IRider extends IBase {
    capacity: number;
    distance?: number;
    readonly user: IUser;
    price_per_km: number;
    service_type: "rides" | "both" | "packages";
}

interface IWallet extends IBase {
    id: number;
    amount: string;
    total_deposit: string;
    total_withdrawn: string;
}

interface ITransaction extends IBase {
    type: string;
    amount: number;
    reference: string;
    status: "pending" | "completed" | "failed";
}

interface ISchedule extends IBase {
    rider: IUser;
    end_time: string;
    capacity: number;
    start_time: string;
    is_started: boolean;
    price_per_km: string;
    scheduled_date: string;
    routes: Array<Record<string, any>>;
}

interface IAddress extends IBase {
    name: string;
    coordinates: Record<string, any>;
}

interface IBooking extends IBase {
    rider: IUser;
    client: IUser;
    status: string;
    capacity: number;
    rider_id: number;
    client_id: number;
    schedule_id: number;
    schedule: ISchedule;
    origin: { address: string; latitude: number; longitude: number; };
    destination: { address: string; latitude: number; longitude: number; };
}

interface IRequest extends IBase {
    rider: IUser;
    price: number;
    client: IUser;
    status: string;
    rider_id: number;
    client_id: number;
    origin: { address: string; latitude: number; longitude: number; };
    destination: { address: string; latitude: number; longitude: number; };
}

interface ISearchRiderData {
    "total_distance": number;
    "distance_to_user": number;
    "distance_to_destination": number;
    "rider": IRider,
    "location": {
        "latitude": number;
        "longitudenumber": number;
    },
}
