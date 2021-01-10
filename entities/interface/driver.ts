export interface DriverDetails {
	name: string
	age: number
	driver_license: string
	driver_license_type: string
	identification_number: string
	tel: string
}

export interface DriverDocument extends DriverDetails {
	driver_id: string
	status: number
}

export interface DriverTable {
	driver_id: string
	driver_license_type: string
	status: number
}