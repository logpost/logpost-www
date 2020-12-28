import React, { useState, useRef, forwardRef, useEffect } from 'react'
import styled from "styled-components"
import { FormActions, PrimaryButton, SecondaryButton } from '../styles/GlobalComponents'
import DatePicker, { registerLocale } from 'react-datepicker'
import th from 'date-fns/locale/th'
import { RightArrow } from './Icons'
import TimeInputComponent from './TimeInputComponent'
import { pad } from '../utilities/helper'
import DateInputComponent from './DateInputComponent'
import { MONTHS } from '../../data/jobs'
registerLocale('th', th)

interface DateAndTimePickerInterface {
	dateAndTime: Date
	setDateAndTime: (date: Date) => void
}

const CalendarHeader = styled.div`
	font-size: 1.6rem;
	background: white;
	font-weight: 600;
	padding: 1.4rem 2rem;
    display: flex;
    justify-content: space-between;
	color: hsl(211, 28%, 28%);
	border-radius: 6px;

	button {
		display: flex;
		align-items: center;

 		&:first-child {
			transform: rotate(-180deg)
		}

		svg {
			width: 1.6rem;
			height: 1.6rem;

			path {
				fill: hsl(16, 56%, 51%);
			}
		}

		&:disabled {
			svg path {
				fill: hsl(211, 28%, 90%);
			}
		}
	}
`

const DatePickerContainer = styled.div`
	position: relative;

	.react-datepicker__input-container input {
		width: 15rem;
		height: 3.4rem;
		border-radius: 0.6rem;
		border: solid 0.1rem hsl(0, 0%, 66%);
		margin-top: 1rem;
		font-size: 1.6rem;
		padding: 1.2rem;
	}

	.react-datepicker {
		font-family: -apple-system, "Bai Jamjuree";
		box-shadow: 4px 4px 18px rgba(52, 71, 92, 0.18);
		border-radius: 6px;
		font-size: 1.6rem;
		border: 0;

		.react-datepicker__header {
			background: white;
			border-bottom: 0;
			padding-top: 0;

			.react-datepicker__day-name{
				margin: 0 0.7rem;
				width: 2.4rem;
				color: hsl(211, 28%, 28%);
				font-weight: 600;
			}
		}

		.react-datepicker__day {
			width: 2.4rem;
    		height: 2.4rem;
			margin: 0.4rem 0.7rem;
			color: hsl(211, 28%, 28%);
			line-height: 2.4rem;
			font-weight: 500;

			&:hover {
				border-radius: 50%;
				background-color: hsl(16, 56%, 90%);
			}
		}

		.react-datepicker__day--today {
			font-weight: 700;
			text-decoration: underline;
		}

		.react-datepicker__day--outside-month {
			color: hsl(211, 28%, 75%);
		}

		.react-datepicker__day--disabled {
			color: hsl(211, 28%, 90%);
		}

		.react-datepicker__day--selected {
			border-radius: 50%;
    		background-color: hsl(16, 56%, 51%);
			color: white;
			outline: none;
		}

		.react-datepicker__day--keyboard-selected {
			border-radius: 50%;
			background-color: hsl(16, 56%, 90%);
			outline: none;
		}
	}
`

const TimePickerContainer = styled.div`
	margin-left: 1.6rem;

	.react-datepicker__input-container input {
		width: 9.2rem;
		height: 3.4rem;
		border-radius: 0.6rem;
		border: solid 0.1rem hsl(0, 0%, 66%);
		margin-top: 1rem;
		font-size: 1.6rem;
		padding: 1.2rem;
	}

	.react-datepicker {
		box-shadow: 4px 4px 18px rgba(52, 71, 92, 0.18);
		border: 0;
		border-radius: 6px;
		padding: 1.4rem;

		.react-datepicker__input-time-container {
			margin: 0;

			.react-datepicker-time__input-container {
				.react-datepicker-time__input {
					margin-left: 0;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}

			.react-datepicker-time__caption {
				display: none;
			}
		}
	}

	${FormActions} {
		font-family: -apple-system, "Bai Jamjuree";
		margin-top: 2rem;
		
		${SecondaryButton} {
			margin-top: 0;
			border: 0;
			padding: 1rem 2rem;
			font-size: 1.6rem;
		}

		${PrimaryButton} {
			margin-top: 0;
			background: hsl(211, 28%, 28%);
			font-size: 1.6rem;
		}
	}
`

const DateAndTimePickerContainer = styled.div`
	display: flex;
`

const DateAndTimePicker = (props:DateAndTimePickerInterface) => {
	const { dateAndTime, setDateAndTime } = props
	const timepicker = useRef(null)
	const datepicker = useRef(null)
	
	const closePicker = () => {
		timepicker.current.setOpen(false)
	}

	const toggleDatePicker = (toggle: boolean) => {
		datepicker.current.setOpen(toggle)
	}

	return (
		<DateAndTimePickerContainer>
			<DatePickerContainer>
				<DatePicker
					ref={datepicker}
					renderCustomHeader={({
						date,
						decreaseMonth,
						increaseMonth,
						prevMonthButtonDisabled,
						nextMonthButtonDisabled
					}) => (
						<CalendarHeader>
							<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
								<RightArrow />
							</button>
							{`${MONTHS[date.getMonth()]} ${date.getFullYear() + 543}`}
							<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
								<RightArrow />
							</button>
						</CalendarHeader>
					)}
					dateFormat="dd MMMM yyyy"
					selected={dateAndTime}
					onChange={(date: Date) => setDateAndTime(date)}
					customInput={<DateInputComponent
						value={String(dateAndTime)}
						toggleCalendar={toggleDatePicker}
						setDateAndTime={setDateAndTime}
						time={dateAndTime.getTime()}
					/>}
					locale={"th"}
					minDate={new Date()}
					showPopperArrow={false}
					showDisabledMonthNavigation
				/>
			</DatePickerContainer>
			<TimePickerContainer>
				<DatePicker
					ref={timepicker}
					showTimeInput
					onChange={(date: Date) => setDateAndTime(date)}
					value={`${pad(String(dateAndTime.getHours()), 2)} : ${pad(String(dateAndTime.getMinutes() - (dateAndTime.getMinutes() % 15)), 2)} น.`}
					selected={dateAndTime}
					showTimeSelectOnly
					showPopperArrow={false}
					customTimeInput={<TimeInputComponent
						date={dateAndTime}
						setDateAndTime={setDateAndTime}
						closePicker={closePicker}
					/>}
					popperPlacement="bottom-end"
				/>
			</TimePickerContainer>
		</DateAndTimePickerContainer>
	)
}

export default DateAndTimePicker
