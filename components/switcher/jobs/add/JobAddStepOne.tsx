import 'react-datepicker/dist/react-datepicker.css';

import {
	FormActions,
	FormHeader,
	FormInputContainer,
	PrimaryButton,
	SecondaryButton
} from '../../../styles/GlobalComponents';
import React, { useRef, useState } from 'react';

import DateAndTimePicker from '../../../common/DateAndTimePicker';
import GoogleMap from '../../../common/GoogleMap';
import InputComponent from '../../../common/InputComponent';
import { JobAddInterface } from '../../../../entities/interface/common';
import Modal from '../../../common/Modal';
import Progress from '../../../common/Progress';
import { extractAddress } from '../../../utilities/helper';
import { initMap, route, selectPosition } from '../../../utilities/googlemaps'
import styled from 'styled-components';
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { pl } from 'date-fns/locale'

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

interface LatLngInterface {
	latitude: number
	longtitude: number
}

interface PlaceInterface {
	pickup: google.maps.places.PlaceResult | google.maps.GeocoderResult
	dropoff: google.maps.places.PlaceResult | google.maps.GeocoderResult
}

const JobAddStepOne = (props: JobAddInterface) => {
	const router = useRouter()
	const { details, setDetails } = props
	const [stepOneDetails, setStepOneDetails] = useState(details)
	const [togglePickupModal, setTogglePickupModal] = useState(false)
	const [toggleDropoffModal, setToggleDropoffModal] = useState(false)
	const [routeMap, setRouteMap] = useState({
		map: null,
		directionsService: null,
		directionsRenderer: null
	})
	const [place, setPlace] = useState<PlaceInterface>({
		pickup: null,
		dropoff: null
	})
	console.log(details)

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setStepOneDetails({ ...stepOneDetails, [e.target.name]: value })
	}

	const submitDetails = () => {
		const pickupExtractedAddress = extractAddress(place.pickup.address_components)
		const pickupAddress = {
			latitude: place.pickup.geometry.location.lat(),
			longitude: place.pickup.geometry.location.lng(),
			address: pickupExtractedAddress.address,  
			province: pickupExtractedAddress.province,
			district: pickupExtractedAddress.district,
			zipcode: pickupExtractedAddress.zipcode,	
		}
		const dropoffExtractedAddress = extractAddress(place.dropoff.address_components)
		const dropoffAddress = {
			latitude: place.dropoff.geometry.location.lat(),
			longitude: place.dropoff.geometry.location.lng(),
			address: dropoffExtractedAddress.address,  
			province: dropoffExtractedAddress.province,
			district: dropoffExtractedAddress.district,
			zipcode: dropoffExtractedAddress.zipcode,	
		}
		setDetails({
			...details,
			pickup_location: pickupAddress,
			dropoff_location: dropoffAddress,
			pickup_date: stepOneDetails.pickup_date,
			dropoff_date: stepOneDetails.dropoff_date,
			distance: stepOneDetails.distance
		})
		// router.push(`/jobs/add/2`, undefined, { shallow: true })
	}

	useEffect(() => {
		initMap(document.getElementById("route-map") as HTMLElement, setRouteMap)
	}, [])

	useEffect(() => {
		const setRouteDistance = (value: number) => setStepOneDetails({...stepOneDetails, distance: value})
		if (place.dropoff && place.dropoff) {
			const pickupLatLng = place.pickup.geometry.location
			const dropoffLatLng = place.dropoff.geometry.location
			route(pickupLatLng, dropoffLatLng, routeMap, setRouteDistance)
		}
	}, [place])

	const openDropoff = () => {
		setToggleDropoffModal(true)
		const targetMap = document.getElementById("dropoff-map") as HTMLElement
		const placeInput = document.getElementById("dropoff-location") as HTMLInputElement
		const setDropoffPlace = (value: google.maps.places.PlaceResult | google.maps.GeocoderResult) => setPlace({...place, dropoff: value})
		const submitButton = document.getElementById("submit-dropoff") as HTMLButtonElement
		selectPosition(targetMap, placeInput, setDropoffPlace, submitButton)
	}

	const openPickup = () => {
		setTogglePickupModal(true)
		const targetMap = document.getElementById("pickup-map") as HTMLElement
		const placeInput = document.getElementById("pickup-location") as HTMLInputElement
		const setPickupPlace = (value: google.maps.places.PlaceResult | google.maps.GeocoderResult) => setPlace({...place, pickup: value})
		const submitButton = document.getElementById("submit-pickup") as HTMLButtonElement
		selectPosition(targetMap, placeInput, setPickupPlace, submitButton)
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
			{/* <GoogleMap 
				pickupInput={document.getElementById("pickup-location") as HTMLInputElement} 
				dropoffInput={document.getElementById("dropoff-location") as HTMLInputElement} 
				setPickupLatLng={(value: Object) => setPickupLocation(value)}
				setDropoffLatLng={(value: Object) => setDropoffLocation(value)}
				setDistance={(value: number) => setStepOneDetails({...stepOneDetails, distance: value})}
			/> */}
			<FormInputContainer>
				<SectionHeader>
					<div>ขึ้นสินค้า</div> <Line />
				</SectionHeader>
				<div onClick={openPickup}>
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
							handleOnChange={handleInputOnChange}
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
				<div onClick={openDropoff}>
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
							handleOnChange={handleInputOnChange}
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
