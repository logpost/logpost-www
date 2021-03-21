import React, { useState } from 'react';

import styled, { css } from 'styled-components';
import { FormActions, FormInputContainer, PrimaryButton, SecondaryButton } from '../styles/GlobalComponents';
import { getAddressFromPlace, handleChangedField } from '../utilities/helper';
import { selectPositionOnMap } from '../utilities/googlemaps';
import InputComponent from './InputComponent';
import Modal from './Modal';
import DateAndTimePicker from './DateAndTimePicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import { jobDetailsState, jobStepOneSelector } from '../../store/atoms/jobDetailsState';
import { JobFormInterface } from '../../entities/interface/job';
import breakpointGenerator from '../utilities/breakpoint';

const FormInputContainerCustom = styled(FormInputContainer)`
	> div > div:not(:first-child) {
		margin-top: 2rem;
	}

	${breakpointGenerator({
		large: css`
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 2.6rem;
			max-width: 110rem;

			> div:not(:first-child) {
				padding: 0 2.6rem;
			}

			> div:last-child {
				margin-top: 0;
			}
			
		`
	})}
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

const Map = styled.div`
	height: 60vh;
	width: 100%;

	&#route-map {
		height: 19rem;
	}
`

const JobFormStepOne = (props: JobFormInterface) => {
	const { changedField, setChangedField, mapID } = props

    const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)
	const stepOneDetails = useRecoilValue(jobStepOneSelector)
	const [togglePickupModal, setTogglePickupModal] = useState(false)
	const [toggleDropoffModal, setToggleDropoffModal] = useState(false)
	const [tempLocation, setTempLocation] = useState()

	const choosePickupDate = (value: Date) => {
		handleChangedField(changedField, setChangedField, ["pickup_date", "dropoff_date"])
		setJobDetails({ ...jobDetails, pickup_date: value})
	}

	const chooseDropoffDate = (value: Date) => {
		handleChangedField(changedField, setChangedField, ["dropoff_date"])
		setJobDetails({ ...jobDetails, dropoff_date: value})
	}

	const initPickupMap = () => {
		setTogglePickupModal(true)
		const targetMap = document.getElementById(mapID.pickupMapID) as HTMLElement
		const placeInput = document.getElementById(mapID.pickupAutoCompleteID) as HTMLInputElement
		const pickupLatLng = {
            latitude: jobDetails.pickup_location.latitude,
            longitude: jobDetails.pickup_location.longitude
        }
		selectPositionOnMap(targetMap, placeInput, setTempLocation, pickupLatLng)
	}
	
	const setPickupLocation = () => {
		handleChangedField(changedField, setChangedField, ["pickup_location"])
		setJobDetails({
			...jobDetails, 
			pickup_location: getAddressFromPlace(tempLocation),
			geocoder_result: {
				...jobDetails.geocoder_result,
				pickup: tempLocation
			}
		})
		setTogglePickupModal(false)
	}

	const initDropoffMap = () => {
		setToggleDropoffModal(true)
		const targetMap = document.getElementById(mapID.dropoffMapID) as HTMLElement
		const placeInput = document.getElementById(mapID.dropoffAutoCompleteID) as HTMLInputElement
		const dropoffLatLng = {
            latitude: jobDetails.dropoff_location.latitude,
            longitude: jobDetails.dropoff_location.longitude
        }
		selectPositionOnMap(targetMap, placeInput, setTempLocation, dropoffLatLng)
	}
	
	const setDropoffLocation = () => {
		handleChangedField(changedField, setChangedField, ["dropoff_location"])
		setJobDetails({
			...jobDetails, 
			dropoff_location: getAddressFromPlace(tempLocation),
			geocoder_result: {
				...jobDetails.geocoder_result,
				dropoff: tempLocation
			}
		})
		setToggleDropoffModal(false)
	}

	return (
		<>
			<FormInputContainerCustom>
				<div>
					<SectionHeader>
						<div>ขึ้นสินค้า</div> <Line />
					</SectionHeader>
					<div onClick={initPickupMap}>
						<InputComponent
							name="pickup_location"
							labelEN="Location"
							labelTH="สถานที่"
							readOnly={true}
							value={(jobDetails.geocoder_result?.pickup?.formatted_address) || "เลือกสถานที่ขึ้นสินค้า"}
						/>
					</div>
					<Modal toggle={togglePickupModal} setToggle={setTogglePickupModal}>
						<ModalContent>
							<span>เลือกสถานที่ขึ้นสินค้า</span>
							<InputComponent
								name="pickup_location"
								id={mapID.pickupAutoCompleteID}
								labelEN="Location"
								labelTH="สถานที่"
								disableLabel={true}
							/>
							<Map id={mapID.pickupMapID} />
							<FormActions>
								<SecondaryButton onClick={() => setTogglePickupModal(false)}>ย้อนกลับ</SecondaryButton>
								<PrimaryButton onClick={setPickupLocation}>เลือกตำแหน่ง</PrimaryButton>
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
							setDateAndTime={(value: Date) => choosePickupDate(value)}
						/>
					</InputComponent>
				</div>
				<div>
					<SectionHeader>
						<div>ลงสินค้า</div> <Line />
					</SectionHeader>
					<div onClick={initDropoffMap}>
						<InputComponent
							name="dropoff_location"
							labelEN="Location"
							labelTH="สถานที่"
							readOnly={true}
							value={(jobDetails.geocoder_result?.dropoff?.formatted_address) || "เลือกสถานที่ลงสินค้า"}
						/>
					</div>
					<Modal toggle={toggleDropoffModal} setToggle={setToggleDropoffModal}>
						<ModalContent>
							<span>เลือกสถานที่ลงสินค้า</span>
							<InputComponent
								name="dropoff_location"
								id={mapID.dropoffAutoCompleteID}
								labelEN="Location"
								labelTH="สถานที่"
								disableLabel={true}
							/>
							<Map id={mapID.dropoffMapID} />
							<FormActions>
								<SecondaryButton onClick={() => setToggleDropoffModal(false)}>ย้อนกลับ</SecondaryButton>
								<PrimaryButton onClick={setDropoffLocation}>เลือกตำแหน่ง</PrimaryButton>
							</FormActions>
						</ModalContent>
					</Modal>
					<InputComponent
						name="dropoff_date"
						labelEN="Date and Time"
						labelTH="วันและเวลา"
						type="other"
					>
						<DateAndTimePicker
							minDate={stepOneDetails.pickup_date}
							dateAndTime={stepOneDetails.dropoff_date < stepOneDetails.pickup_date ? stepOneDetails.pickup_date : stepOneDetails.dropoff_date}
							setDateAndTime={(value: Date) => chooseDropoffDate(value)}
						/>
					</InputComponent>
				</div>
			</FormInputContainerCustom>
		</>
	)
}

export default JobFormStepOne
