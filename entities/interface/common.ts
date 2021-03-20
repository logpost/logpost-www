import { ChangeEvent, ReactElement } from 'react'
import { RecoilState, SetterOrUpdater } from 'recoil';
import { StyledComponent } from 'styled-components';
import { DriverTable } from './driver';
import { JobDetails } from './job';
import { TruckTable } from './truck';

export interface AuthInterface {
	username: string
	password: string
}

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
	valid?: boolean
	invalidText?: string
}

export interface SignUpFormInterface {
	role: string
}

export interface ProfileJobStatusInterface {
	title: string
	buttonText: string
	buttonLink: string
	type: string
	items: {
		name: string
		icon?: JSX.Element
		onClickLink?: string
		noOfJobs?: number
		metric?: number
	}[]
}

export interface ToggleComponentInterface {
	toggle: boolean
	setToggle: (toggle: boolean) => void
}

export interface FilterSelector {
	status: number[]
}

export interface TableComponentInterface {
	columns: {
		id: string
		label: string
		align?: string
		width?: string
		sortable?: boolean
		format?: (index: number, item?: (TruckTable | DriverTable | JobDetails)) => ReactElement
	}[]
	tableStyle?: {
		width?: string,
		gap: string
	}
	RowStyle?: StyledComponent<"tr", any, {}>
	HeaderStyle?: StyledComponent<"tr", any, {}>
	PaginationStyle?: StyledComponent<"div", any, {}>
	filterSelector: RecoilState<FilterSelector[]>
	rowPerPage?: number
}

export interface DateFilter {
    isFilter: boolean
    start: Date
    end: Date
}

export interface RangeFilter {
	from: string
	to: string
}

export interface Filter {
    type: string
    name?: string
    inputType?: string
    label?: string
    value?: string | DateFilter | RangeFilter
    classifier?: string
    placeholder?: string
    list?: string[]
    icon?: () => JSX.Element
    onChange?: ((
		value: string | number | ChangeEvent<HTMLInputElement>,
		target?: string
	) => void) | SetterOrUpdater<string>
    setEnabled?: (value: boolean) => void
    setStart?: (value: Date) => void
    setEnd?: (value: Date) => void
    enabled?: boolean
}

export interface FilterComponentInterface {
    filterList: {
        [key: number]: Filter[]
    }
}