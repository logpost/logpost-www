import React, { useState, useRef } from "react"
import Progress from "../../../common/Progress"
import styled from "styled-components"
import InputComponent from "../../../common/InputComponent"
import {
	FormActions,
	PrimaryButton,
	SecondaryButton,
	FormInputContainer,
	FormHeader
} from "../../../styles/GlobalComponents"
import { JobAddInterface } from "../../../../entities/interface/common"
import { useRouter } from "next/router"
import "react-datepicker/dist/react-datepicker.css"
import DateAndTimePicker from "../../../common/DateAndTimePicker"

const JobMap = styled.div`
	background: url(/images/job-map.png) no-repeat;
	background-size: contain;
	height: 19rem;
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

const JobAddStepOne = (props: JobAddInterface) => {
	const router = useRouter()
	const { details, setDetails } = props
	const [stepOneDetails, setStepOneDetails] = useState(details)
	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setStepOneDetails({ ...stepOneDetails, [e.target.name]: value })
	}

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

	return (
		<div>
			<FormHeader>
				<Progress
					currentStep="จุดขึ้น - ลงสินค้า"
					nextStep="ข้อมูลสินค้าและราคา"
					percent={1 / 4}
				/>
			</FormHeader>
			<JobMap />
			<FormInputContainer>
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
				<InputComponent
					name="pickup_date"
					labelEN="Date and Time"
					labelTH="วันและเวลา"
					type="other"
				>
					<DateAndTimePicker
						dateAndTime={stepOneDetails.pickup_date || new Date()}
						setDateAndTime={(value: Date) => setStepOneDetails({ ...stepOneDetails, pickup_date: value })}
					/>
				</InputComponent>
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
					type="other"
				>
					<DateAndTimePicker
						minDate={stepOneDetails.pickup_date}
						dateAndTime={stepOneDetails.dropoff_date || stepOneDetails.pickup_date || new Date()}
						setDateAndTime={(value: Date) => setStepOneDetails({ ...stepOneDetails, dropoff_date: value })}
					/>
				</InputComponent>
				<FormActions>
					<SecondaryButton onClick={() => router.back()}>ยกเลิก</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>ส่วนถัดไป</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</div>
	)
}

export default JobAddStepOne
