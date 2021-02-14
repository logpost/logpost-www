import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';

import styled from 'styled-components';
import { useEffect } from 'react'
import { FormActions, FormInputContainer, PrimaryButton, SecondaryButton } from '../styles/GlobalComponents';
import { MapInterface } from '../../entities/interface/googlemaps';
import { getAddressFromPlace } from '../utilities/helper';
import { initMap, route, selectPositionOnMap } from '../utilities/googlemaps';
import InputComponent from './InputComponent';
import Modal from './Modal';
import DateAndTimePicker from './DateAndTimePicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import { jobDetailsState, jobStepOneSelector } from '../../store/atoms/jobDetailsState';


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

const JobFormStepOne = () => {
    const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)
	console.log(jobDetails)
	const stepOneDetails = useRecoilValue(jobStepOneSelector)
	const [togglePickupModal, setTogglePickupModal] = useState(false)
	const [toggleDropoffModal, setToggleDropoffModal] = useState(false)
	const [routeMap, setRouteMap] = useState<MapInterface>({
		map: null,
		directionsService: null,
		directionsRenderer: null
	})

	useEffect(() => {
		initMap(document.getElementById("route-map") as HTMLElement, setRouteMap)
	}, [])

	useEffect(() => {
		const setRouteDetails = (distance: number, duration: number) => setJobDetails({...jobDetails, distance, duration})
		if (jobDetails.pickup_location.latitude && jobDetails.dropoff_location.latitude && routeMap.map) {
			const pickupLatLng = {
                latitude: jobDetails.pickup_location.latitude,
                longitude: jobDetails.pickup_location.longitude
            }
			const dropoffLatLng = {
                latitude: jobDetails.dropoff_location.latitude,
                longitude: jobDetails.dropoff_location.longitude
            }
            route(pickupLatLng, dropoffLatLng, routeMap, setRouteDetails)
		}
	}, [jobDetails.geocoder_result, routeMap])

	const chooseDropoff = () => {
		setToggleDropoffModal(true)
		const targetMap = document.getElementById("dropoff-map") as HTMLElement
		const placeInput = document.getElementById("dropoff-location") as HTMLInputElement
		const dropoffLatLng = {
            latitude: jobDetails.dropoff_location.latitude,
            longitude: jobDetails.dropoff_location.longitude
        }
        const setDropoffPlace = (value: google.maps.places.PlaceResult | google.maps.GeocoderResult) => {
            setJobDetails({
                ...jobDetails, 
                dropoff_location: getAddressFromPlace(value),
                geocoder_result: {
                    ...jobDetails.geocoder_result,
                    dropoff: value
                }
            })
        }
		const submitButton = document.getElementById("submit-dropoff") as HTMLButtonElement
		selectPositionOnMap(targetMap, placeInput, setDropoffPlace, dropoffLatLng, submitButton)
	}

	const choosePickup = () => {
		setTogglePickupModal(true)
		const targetMap = document.getElementById("pickup-map") as HTMLElement
		const placeInput = document.getElementById("pickup-location") as HTMLInputElement
		const pickupLatLng = {
            latitude: jobDetails.pickup_location.latitude,
            longitude: jobDetails.pickup_location.longitude
        }
        const setPickupPlace = (value: google.maps.places.PlaceResult | google.maps.GeocoderResult) => {
            setJobDetails({
                ...jobDetails, 
                pickup_location: getAddressFromPlace(value),
                geocoder_result: {
                    ...jobDetails.geocoder_result,
                    pickup: value
                }
            })
        }
		const submitButton = document.getElementById("submit-pickup") as HTMLButtonElement
		selectPositionOnMap(targetMap, placeInput, setPickupPlace, pickupLatLng, submitButton)
	}

	return (
		<>
			{/* <Map id="route-map" /> */}
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
						value={(jobDetails.geocoder_result?.pickup?.formatted_address) || "เลือกสถานที่ขึ้นสินค้า"}
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
						setDateAndTime={(value: Date) => setJobDetails({ ...jobDetails, pickup_date: value })}
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
						value={(jobDetails.geocoder_result?.dropoff?.formatted_address) || "เลือกสถานที่ลงสินค้า"}
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
						setDateAndTime={(value: Date) => setJobDetails({ ...jobDetails, dropoff_date: value })}
					/>
				</InputComponent>
			</FormInputContainer>
		</>
	)
}

export default JobFormStepOne
