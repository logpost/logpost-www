import { CarrierSpecificationInterface } from "./carrier"
import { PlaceInterface } from "./googlemaps"

export interface LocationInterface {
	latitude: number
	longitude: number
	address: string
	province: string 
	district: string
	zipcode: string
}

export interface JobDetails {
	pickup_location: LocationInterface
	dropoff_location: LocationInterface 
	pickup_date: Date
	dropoff_date: Date
	weight: number
	carrier_specification: CarrierSpecificationInterface
	product_type: string
	offer_price: number
	auto_price: number
	description?: string
	distance: number
	duration: number
	permission: string
	waiting_time?: number
	geocoder_result?: PlaceInterface
}

export interface JobDocument extends JobDetails {
	job_id?: string 
	shipper_id?: string 
	carrier_id?: string
	driver_id?: string
	truck_id?: string
	shipper_display_name?: string
	carrier_display_name?: string
	driver_name?: string,
	license_number?: string,
	status?: number
	created_at?: Date
	updated_at?: Date
}

export interface JobAddInterface {
	details: JobDetails
	setDetails: (jobDetails: JobDetails) => void
}