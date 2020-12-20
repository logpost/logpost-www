import React, { useState, useRef } from "react"
import Progress from "../../../common/Progress"
import styled from "styled-components"
import InputComponent from "../../../common/Input"
import {
	FormActions,
	PrimaryButton,
	SecondaryButton,
} from "../../../styles/GlobalComponents"
import { JobAddInterface } from "../../../../entities/interface/common"
import { useRouter } from "next/router"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import th from 'date-fns/locale/th'
import { RightArrow } from "../../../common/Icons"
import TimeInputComponent from "../../../common/TimeInputComponent"
registerLocale('th', th)

const months = [
	"มกราคม",
	"กุมภาพันธ์",
	"มีนาคม",
	"เมษายน",
	"พฤษภาคม",
	"มิถุนายน",
	"กรกฎาคม",
	"สิงหาคม",
	"กันยายน",
	"ตุลาคม",
	"พฤศจิกายน",
	"ธันวาคม"
]

const JobMap = styled.div`
	background: url(/images/job-map.png) no-repeat;
	background-size: contain;
	height: 19rem;
`

const Header = styled.div`
	background-color: hsl(0, 0%, 98%);
	padding: 1.4rem 2.4rem;
`

const InputContainer = styled.div`
	padding: 1.8rem 2.6rem;

	> div:not(:first-child) {
		margin-top: 2rem;
	}

	${PrimaryButton} {
		margin-top: 3rem;
	}
`

const SectionHeader = styled.div`
	font-size: 2rem;
	font-weight: 600;
	color: hsl(16, 56%, 51%);
	display: flex;
	align-items: center;
	height: 2.5rem;

	div:first-child {
		padding-right: 1.8rem;
		position: absolute;
		background: white;
	}
`

const Line = styled.div`
	height: 0.2rem;
	border-radius: 10rem;
	background-color: hsl(16, 56%, 51%);
	width: 100%;
`

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
		}
	}
`

const TimePickerContainer = styled.div`
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
		}

		${PrimaryButton} {
			margin-top: 0;
			background: hsl(211, 28%, 28%);
		}
	}
`

const JobAddStepOne = (props: JobAddInterface) => {
	const router = useRouter()
	const timepicker = useRef(null);
	const { details, setDetails } = props
	const [stepOneDetails, setStepOneDetails] = useState(details)
	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setStepOneDetails({ ...stepOneDetails, [e.target.name]: value })
	}
	const [startDate, setStartDate] = useState(new Date())
	console.log(startDate)

	const submitDetails = () => {
		setDetails({
			...details,
			pickup_location: stepOneDetails.pickup_location,
			dropoff_location: stepOneDetails.dropoff_location,
			pickup_date: stepOneDetails.pickup_date,
			dropoff_date: stepOneDetails.dropoff_date,
		})
		router.push(`/jobs/add/2`, undefined, { shallow: true })
	}

	const closePicker = () => {
		timepicker.current.setOpen(false)
	}

	return (
		<div>
			<Header>
				<Progress
					currentStep="จุดขึ้น - ลงสินค้า"
					nextStep="ข้อมูลสินค้าและราคา"
					percent={1 / 4}
				/>
			</Header>
			<JobMap />
			<InputContainer>
				<SectionHeader>
					<div>ขึ้นสินค้า</div> <Line />
				</SectionHeader>
				<InputComponent
					name="pickup_location"
					labelEN="Location"
					labelTH="สถานที่"
					value={stepOneDetails.pickup_location}
					handleOnChange={handleInputOnChange}
				/>
				<DatePickerContainer>
					<DatePicker
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
								{`${months[date.getMonth()]} ${date.getFullYear() + 543}`}
								<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
									<RightArrow />
								</button>
							</CalendarHeader>
						)}
						value={`${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear() + 543}`}
						selected={startDate}
						onChange={(date: Date) => setStartDate(date)}
						locale={"th"}
						minDate={new Date()}
						showPopperArrow={false}
						showDisabledMonthNavigation
						disabledKeyboardNavigation
					/>
				</DatePickerContainer>
				<TimePickerContainer>
					<DatePicker
						ref={timepicker}
						showTimeInput
						onChange={(date: Date) => setStartDate(date)}
						value={`${startDate.getHours()} : ${startDate.getMinutes() < 10 ? "0" : ""}${startDate.getMinutes()} น.`}
						selected={startDate}
						showTimeSelectOnly
						showPopperArrow={false}
						customTimeInput={<TimeInputComponent 
							date={startDate} 
							setDate={setStartDate}
							closePicker={closePicker}
						/>}
					/>
				</TimePickerContainer>
				<InputComponent
					name="pickup_date"
					labelEN="Date and Time"
					labelTH="วันและเวลา"
					value={stepOneDetails.pickup_date}
					handleOnChange={handleInputOnChange}
				/>
				<SectionHeader>
					<div>ลงสินค้า</div> <Line />
				</SectionHeader>
				<InputComponent
					name="dropoff_location"
					labelEN="Location"
					labelTH="สถานที่"
					value={stepOneDetails.dropoff_location}
					handleOnChange={handleInputOnChange}
				/>
				<InputComponent
					name="dropoff_date"
					labelEN="Date and Time"
					labelTH="วันและเวลา"
					value={stepOneDetails.dropoff_date}
					handleOnChange={handleInputOnChange}
				/>
				<FormActions>
					<SecondaryButton>ยกเลิก</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>ส่วนถัดไป</PrimaryButton>
				</FormActions>
			</InputContainer>
		</div>
	)
}

export default JobAddStepOne
