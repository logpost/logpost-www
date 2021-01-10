import { AccountInterface } from "./account"
import { DriverDocument } from "./driver"
import { TruckDocument, TruckPropertyInterface } from "./truck"

export interface CarrierSpecificationInterface { 
    truck:  {
		age: number
    	property: TruckPropertyInterface
	}
    driver: {
		driver_license_type: string
	}
}
export interface CarrierDocument extends AccountInterface {
    carrier_id: string
    tel: string
    address: string
    role: string 
    account_description: string
    juristic_id: string
    verified: boolean
    trucks: TruckDocument[]
	drivers:  DriverDocument[]
}
