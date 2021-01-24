import 'react-datepicker/dist/react-datepicker.css';

import {
	FormActions,
	FormHeader,
	FormInputContainer,
	PrimaryButton,
	SecondaryButton
} from '../../../styles/GlobalComponents';
import React, { useState } from 'react';

import DateAndTimePicker from '../../../common/DateAndTimePicker';
import InputComponent from '../../../common/InputComponent';
import Modal from '../../../common/Modal';
import Progress from '../../../common/Progress';
import { getAddressFromPlace } from '../../../utilities/helper';
import { initMap, route, selectPositionOnMap } from '../../../utilities/googlemaps'
import styled from 'styled-components';
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { MapInterface, PlaceInterface } from '../../../../entities/interface/googlemaps'
import { JobAddInterface } from '../../../../entities/interface/job'

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
	height: 45rem;
	width: 100%;

	&#route-map {
		height: 19rem;
	}
`

const JobAddStepOne = (props: JobAddInterface) => {
	const router = useRouter()
	const { details, setDetails } = props
	const [stepOneDetails, setStepOneDetails] = useState(details)
	const [togglePickupModal, setTogglePickupModal] = useState(false)
	const [toggleDropoffModal, setToggleDropoffModal] = useState(false)
	const [routeMap, setRouteMap] = useState<MapInterface>({
		map: null,
		directionsService: null,
		directionsRenderer: null
	})
	const [place, setPlace] = useState<PlaceInterface>({
		pickup: (details.geocoder_result && details.geocoder_result.pickup) || null,
		dropoff: (details.geocoder_result && details.geocoder_result.dropoff) || null
	})

	const submitDetails = () => {
		setDetails({
			...details,
			pickup_location: getAddressFromPlace(place.pickup),
			dropoff_location: getAddressFromPlace(place.dropoff),
			pickup_date: stepOneDetails.pickup_date,
			dropoff_date: stepOneDetails.dropoff_date,
			duration: stepOneDetails.duration,
			distance: stepOneDetails.distance,
			geocoder_result: place
		})
		router.push(`/jobs/add/2`, undefined, { shallow: true })
	}

	useEffect(() => {
		initMap(document.getElementById("route-map") as HTMLElement, setRouteMap)
	}, [])

	useEffect(() => {
		const setRouteDetails = (distance: number, duration: number) => setStepOneDetails({...stepOneDetails, distance, duration})
		if (place.pickup && place.dropoff && routeMap.map) {
			const pickupLatLng = place.pickup.geometry.location
			const dropoffLatLng = place.dropoff.geometry.location
			route(pickupLatLng, dropoffLatLng, routeMap, setRouteDetails)
		}
	}, [place, routeMap])

	const chooseDropoff = () => {
		setToggleDropoffModal(true)
		const targetMap = document.getElementById("dropoff-map") as HTMLElement
		const placeInput = document.getElementById("dropoff-location") as HTMLInputElement
		const dropoffLatLng = place.dropoff && place.dropoff.geometry.location
		const setDropoffPlace = (value: google.maps.places.PlaceResult | google.maps.GeocoderResult) => setPlace({...place, dropoff: value})
		const submitButton = document.getElementById("submit-dropoff") as HTMLButtonElement
		selectPositionOnMap(targetMap, placeInput, setDropoffPlace, dropoffLatLng,submitButton)
	}

	const choosePickup = () => {
		setTogglePickupModal(true)
		const targetMap = document.getElementById("pickup-map") as HTMLElement
		const placeInput = document.getElementById("pickup-location") as HTMLInputElement
		const pickupLatLng = place.pickup && place.pickup.geometry.location
		const setPickupPlace = (value: google.maps.places.PlaceResult | google.maps.GeocoderResult) => setPlace({...place, pickup: value})
		const submitButton = document.getElementById("submit-pickup") as HTMLButtonElement
		selectPositionOnMap(targetMap, placeInput, setPickupPlace, pickupLatLng, submitButton)
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
			<Map id="route-map" />
			<FormInputContainer>
				<SectionHeader>
					<div>ขึ้นสินค้า</div> <Line />
				</SectionHeader>
				<div onClick={choosePickup}>
					<InputComponent
						name="pickup_location"
						labelEN="Location"
						labelTH="สถานที่"
						readOnly={true}
						value={(place.pickup && place.pickup.formatted_address) || "เลือกสถานที่ขึ้นสินค้า"}
					/>
				</div>
				<Modal toggle={togglePickupModal} setToggle={setTogglePickupModal}>
					<ModalContent>
						<span>เลือกสถานที่ขึ้นสินค้า</span>
						<InputComponent
							name="pickup_location"
							id="pickup-location"
							labelEN="Location"
							labelTH="สถานที่"
							disableLabel={true}
						/>
						<Map id="pickup-map" />
						<FormActions>
							<SecondaryButton onClick={() => setTogglePickupModal(false)}>ย้อนกลับ</SecondaryButton>
							<PrimaryButton id="submit-pickup" onClick={() => setTogglePickupModal(false)}>เลือกตำแหน่ง</PrimaryButton>
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
				<div onClick={chooseDropoff}>
					<InputComponent
						name="dropoff_location"
						labelEN="Location"
						labelTH="สถานที่"
						readOnly={true}
						value={(place.dropoff && place.dropoff.formatted_address) || "เลือกสถานที่ลงสินค้า"}
					/>
				</div>
				<Modal toggle={toggleDropoffModal} setToggle={setToggleDropoffModal}>
					<ModalContent>
						<span>เลือกสถานที่ลงสินค้า</span>
						<InputComponent
							name="dropoff_location"
							id="dropoff-location"
							labelEN="Location"
							labelTH="สถานที่"
							disableLabel={true}
						/>
						<Map id="dropoff-map" />
						<FormActions>
							<SecondaryButton onClick={() => setToggleDropoffModal(false)}>ย้อนกลับ</SecondaryButton>
							<PrimaryButton id="submit-dropoff" onClick={() => setToggleDropoffModal(false)}>เลือกตำแหน่ง</PrimaryButton>
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
						setDateAndTime={(value: Date) => setStepOneDetails({ ...stepOneDetails, dropoff_date: value })}
					/>
				</InputComponent>
				<FormActions>
					<SecondaryButton onClick={() => router.push("/jobs")}>ยกเลิก</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>ส่วนถัดไป</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</div>
	)
}

export default JobAddStepOne
