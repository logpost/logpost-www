import { StringDecoder } from "string_decoder"
import { ReactElement } from 'react'
import { JobInterface } from "./job"
import { PlaceInterface } from "./googlemaps"

export interface AuthInterface {
	username: string
	password: string
}
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

export interface JobAddInterface {
	details: JobInterface
	setDetails: (details: JobInterface) => void
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