import { StringDecoder } from "string_decoder"
import { ReactElement } from 'react'
import { PlaceInterface } from "./googlemaps"

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
	id?: string
	readOnly?: boolean
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
	pickup_location?: {
		latitude: number,
		longitude: number
		address: string,  
		province: string,
		district: string,
		zipcode: string,
	}
	dropoff_location?: {
		latitude: number,
		longitude: number,
		address: string,  
		province: string,
		district: string,
		zipcode: string,
	}
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
			property?: {
				type?: string,
				option?: string,
				chassis?: number
			}
		}
		driver?: {
			driver_license_type?: string
		}
	}
	geocoder_result?: PlaceInterface
}

export interface JobAddInterface {
	details: JobDetailsInterface
	setDetails: (details: JobDetailsInterface) => void
}

export interface TableComponentInterface {
	columns: {
		id: string
		label: string
		align?: string
		width?: string
		format?: (index: number, value?: string | number) => ReactElement
	}[]
	data: {
		id?: string
		driver_name?: string
		driver_license_type?: string
		license_number?: string
		wheel?: string
		add_on?: string
	}[]
}