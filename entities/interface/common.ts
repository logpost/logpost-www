import { StringDecoder } from "string_decoder"

export interface InputComponentInterface {
	name?: string
	value?: string
	labelTH?: string
	labelEN?: string
	subLabel?: string
	labelSize?: string
	handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	description?: string
	type?: string
	classifier?: string
	disableLabel?: boolean
	required?: boolean
}

export interface ProfileInterface {
	account_type: string
	username: string
	password: string
	name: string
	displayName?: string
	email: string
}

export interface SignUpFormInterface {
	role: string
}

export interface ProfileJobStatusInterface {
	title: string
	buttonText: string
	items: {
		name: string
		icon: JSX.Element
		status: string
		noOfJobs?: number
	}[]
}

export interface ToggleComponentInterface {
	toggle: boolean
	setToggle: (toggle: boolean) => void
}

 export interface JobDetailsInterface {
	_id?: string
	carrier_id?: string
	pickup_location?: string
	dropoff_location?: string
	pickup_date?: Date
	dropoff_date?: Date
	product_type?: string
	weight?: number
	waiting_time?: number
	offer_price?: number
	auto_price?: number
	status?: number
	distance?: number
	permission?: StringDecoder
	description?: string
	carrier_specification?: { 
		truck?: {
			age?: number
			type?: {
				wheel?: number,
				options?: string
			}
		}
		driver?: {
			driver_license_type?: string
		}
	}
}

export interface JobAddInterface {
	details: JobDetailsInterface
	setDetails: (details: JobDetailsInterface) => void
}
