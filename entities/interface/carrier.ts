export interface TruckPropertyInterface {
	type?: string
	option?: string
	chassis?: number
}

export interface TruckWeightInterface {
	max?: number
	min?: number
}

export interface TruckInterface {
	truck_id: string
	license_number: string
	gasoline: string
	age: number
	is_insure: boolean
	status: number
	property: TruckPropertyInterface
	weight: TruckWeightInterface
	created_at: Date
	updated_at: Date
}

export interface DriverInterface {
	driver_id: string
	name: string
	age: number
	driver_license: string
	driver_license_type: string
	identification_number: string
	status: number
	created_at: Date
	updatedAt: Date
}

export interface TruckSpecificationInterface {
    age: number
    property: TruckPropertyInterface
}

export interface DriverSpecificationInterface {
    driver_license_type: string
}

export interface CarrierSpecificationInterface { 
    truck:  TruckSpecificationInterface 
    driver: DriverSpecificationInterface 
}

export interface CarrierProfile {
	username: string
    password: string
    email: string
    name: string
	display_name: string
	account_type: string
}

export interface CarrierDocument extends CarrierProfile {
    readonly carrier_id: string
    readonly tel: string
    readonly address: string
    readonly role: string 
    readonly account_description: string
    readonly juristic_id: string
    readonly verified: boolean
    readonly trucks: TruckInterface 
	readonly drivers:  DriverInterface 
    readonly create_at: Date
    readonly updated_at: Date
}
