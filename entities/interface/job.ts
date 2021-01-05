import { CarrierSpecificationInterface } from "./carrier"
import { PlaceInterface } from "./googlemaps"

export interface Location {
	latitude: number
	longitude: number
	address: string
	province: string 
	district: string
	zipcode: string
}

export interface JobInterface {
	job_id?: string 
	shipper_id?: string 
	jobs_id?: string
	driver_id?: string
	truck_id?: string
	owner_display_name?: string
	pickup_location: Location
	dropoff_location: Location 
	pickup_date: Date
	dropoff_date: Date
	weight: number
	carrier_specification: CarrierSpecificationInterface
	product_type: string
	offer_price: number
	auto_price?: number
	description?: string
	status: number
	distance: number
	permission: string
	waiting_time: number
	created_at?: Date
	updated_at?: Date
	delete_at?: Date
	geocoder_result?: PlaceInterface
}

export interface JobAddInterface {
	details: JobInterface
	setDetails: (details: JobInterface) => void
}