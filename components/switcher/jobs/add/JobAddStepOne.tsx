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
import GoogleMap from "../../../common/GoogleMap"
import Modal from "../../../common/Modal"
import { extractAddress } from "../../../utilities/helper"

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

const ModalContent = styled.div`
	padding: 0 2rem;
	text-align: center;

	span {
		font-weight: 500;
	}

	> div:nth-child(3), ${FormActions} {
		margin-top: 1rem;
	}
`

interface LatLngInterface {
	latitude: number
	longtitude: number
}

const JobAddStepOne = (props: JobAddInterface) => {
	const router = useRouter()
	const { details, setDetails } = props
	const [stepOneDetails, setStepOneDetails] = useState(details)
	const [pickupLocation, setPickupLocation] = useState(details.pickup_location)
	const [dropoffLocation, setDropoffLocation] = useState(details.dropoff_location)
	const [toggleModal, setToggleModal] = useState(false)
	const [place, setPlace] = useState({
		pickup: {},
		dropoff: {}
	})

	console.log(details)

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setStepOneDetails({ ...stepOneDetails, [e.target.name]: value })
	}

	const submitDetails = () => {
		const extractedAddress = extractAddress(place.pickup.address_components)
		const address = {
			latitude: place.pickup.geometry.location.lat(),
			longtitude: place.pickup.geometry.location.lng(),
			address: extractedAddress.address,  
			province: extractedAddress.province,
			district: extractedAddress.district,
			zipcode: extractedAddress.zipcode,	
		}
		setDetails({
			...details,
			pickup_location: address,
			dropoff_location: dropoffLocation,
			pickup_date: stepOneDetails.pickup_date,
			dropoff_date: stepOneDetails.dropoff_date,
			distance: stepOneDetails.distance
		})
		// router.push(`/jobs/add/2`, undefined, { shallow: true })
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
			{/* <GoogleMap 
				pickupInput={document.getElementById("pickup-location") as HTMLInputElement} 
				dropoffInput={document.getElementById("dropoff-location") as HTMLInputElement} 
				setPickupLatLng={(value: Object) => setPickupLocation(value)}
				setDropoffLatLng={(value: Object) => setDropoffLocation(value)}
				setDistance={(value: number) => setStepOneDetails({...stepOneDetails, distance: value})}
			/> */}
			{/* <JobMap /> */}
			<FormInputContainer>
				<SectionHeader>
					<div>ขึ้นสินค้า</div> <Line />
				</SectionHeader>
				<div onClick={() => setToggleModal(true)}>
					<InputComponent
						name="pickup_location"
						labelEN="Location"
						labelTH="สถานที่"
						readOnly={true}
						value={place.pickup.formatted_address}
					/>
				</div>
				<Modal toggle={toggleModal} setToggle={setToggleModal}>
					<ModalContent>
						<span>เลือกสถานที่ขึ้นสินค้า</span>
						<InputComponent
							name="pickup_location"
							id="pickup-location"
							labelEN="Location"
							labelTH="สถานที่"
							disableLabel={true}
							handleOnChange={handleInputOnChange}
						/>
						<GoogleMap 
							originInput={document.getElementById("pickup-location") as HTMLInputElement} 
							dropoffInput={document.getElementById("dropoff-location") as HTMLInputElement} 
							setAddress={(value: Object) => setPickupLocation(value)}
							setDistance={(value: number) => setStepOneDetails({...stepOneDetails, distance: value})}
							setPlace={(value: string) => setPlace({...place, pickup: value})}
							submitButton={document.getElementById("submit-address") as HTMLButtonElement}
						/>
						<FormActions>
							<SecondaryButton onClick={() => setToggleModal(false)}>ย้อนกลับ</SecondaryButton>
							<PrimaryButton id="submit-address" onClick={() => setToggleModal(false)}>เลือกตำแหน่ง</PrimaryButton>
						</FormActions>
					</ModalContent>
				</Modal>
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
					readOnly={true}
					handleOnChange={handleInputOnChange}
				/>
				<InputComponent
					name="dropoff_date"
					labelEN="Date and Time"
					labelTH="วันและเวลา"
					type="other"
				>
					<DateAndTimePicker
						dateAndTime={stepOneDetails.dropoff_date || new Date()}
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
