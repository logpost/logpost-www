export interface TruckPropertyInterface {
	type: string
	option: string
	chassis?: number
}

export interface TruckWeightInterface {
	max: number
	min: number
}

export interface TruckDetails {
	license_number: string
	gasoline: string
	age: number
	is_insure: boolean
	property: TruckPropertyInterface
	weight: TruckWeightInterface
}

export interface TruckDocument extends TruckDetails {
	truck_id: string
	status: number
}

export interface TruckAddInterface {
	details: TruckDetails
	setDetails: (value: TruckDetails) => void
}

export interface TruckTable {
	truck_id?: string
	license_number: string
	type: string
	option?: string
	status?: number
}