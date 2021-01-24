import { DriverDocument } from "./driver";
import { TruckDocument } from "./truck";

export interface AccountInterface {
	username: string
    password: string
    email: string
    name: string
	display_name: string
	account_type: string
}

export interface ProfileInterface {
    username: string,
    tel: string,
    name: string,
    display_name: string,
    juristic_id: string,
    address: {
        address: string,  
        province: string,
        district: string,
        zipcode: string
    }
    account_description: string
    trucks?: TruckDocument[]
    drivers?: DriverDocument[]
}