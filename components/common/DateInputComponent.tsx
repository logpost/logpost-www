import React, { forwardRef, useState, useEffect } from 'react'
import { MONTHS } from '../../data/jobs'
import { pad } from '../utilities/helper'

interface DateInputComponentInterface {
	value: string,
	toggleCalendar: (toggle: boolean) => void,
	setDateAndTime: (date: Date) => void,
	time: number,
	disabled: boolean
}

const DateInputComponent = forwardRef((props: DateInputComponentInterface, ref) => {
	const { value, toggleCalendar, setDateAndTime, time, disabled } = props
	const [displayValue, setDisplayValue] = useState(value)

	const handleOnChange = (value: string) => {
		setDisplayValue(value)
	}

	useEffect(() => {
		const dateList = value.split(" ")
		const year = parseInt(dateList[2]) + 543
		const newDate = `${pad(dateList[0], 2)} ${dateList[1]} ${year}`
		setDisplayValue(newDate)
	}, [value])

	const submitDate = () => {
		const date = new Date(time)
		const today = new Date()
		const dateList = displayValue.split(" ")
		const selectedYear = parseInt(dateList[2]) - 543
		const todayYear = today.getFullYear()
		const isYearNotValid = (isNaN(selectedYear) || (selectedYear <= todayYear))
		date.setFullYear(isYearNotValid ? todayYear : selectedYear)

		const selectedMonth = MONTHS.indexOf(dateList[1])
		const todayMonth = today.getMonth()
		const isMonthNotValid = (selectedMonth === -1 || (selectedMonth <= todayMonth))
		date.setMonth(isYearNotValid && isMonthNotValid ? todayMonth : selectedMonth)

		const selectedDate = parseInt(dateList[0])
		const todayDate = today.getDate()
		const isDateNotValid = (selectedDate > 31 || isNaN(selectedDate) || (selectedDate <= todayDate))
		date.setDate(isYearNotValid && isMonthNotValid && isDateNotValid ? todayDate : selectedDate)

		setDateAndTime(date)
		setDisplayValue(`${pad(String(date.getDate()), 2)} ${MONTHS[date.getMonth()]} ${date.getFullYear() + 543}`)
	}

	const handleEnter = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			submitDate()
			toggleCalendar(false)
		}
	}

	return (
		<input 
			onChange={(e) => handleOnChange(e.target.value)} 
			onKeyDown={(e) => handleEnter(e)}
			onBlur={submitDate}
			value={displayValue}
			onClick={() => toggleCalendar(true)}
			disabled={disabled}
		/>
	)
})

export default DateInputComponent
