import { CarrierSpecificationInterface } from "./carrier"

export interface JobInterface {
	readonly job_id?: string 
	readonly shipper_id?: string 
	readonly jobs_id?: string
	readonly driver_id?: string
	readonly truck_id?: string
	readonly owner_display_name?: string
	readonly pickup_location: string //***
	readonly dropoff_location: string //***
	readonly pickup_date: Date
	readonly dropoff_date: Date
	readonly weight: number
	readonly carrier_specification: CarrierSpecificationInterface
	readonly product_type: string
	readonly offer_price: number
	readonly auto_price?: number
	readonly description?: string
	readonly status: number
	readonly distance: number
	readonly permission: string
	readonly waiting_time: number
	readonly created_at?: Date
	readonly updated_at?: Date
	readonly delete_at?: Date
}