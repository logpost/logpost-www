import 'react-datepicker/dist/react-datepicker.css';

import {
	FormActions,
	FormHeader,
	PrimaryButton,
	SecondaryButton
} from '../../../styles/GlobalComponents';
import React, { useState, useEffect } from 'react';

import Progress from '../../../common/Progress';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import JobFormStepOne from '../../../common/JobFormStepOne';
import { initMap, route } from '../../../utilities/googlemaps';
import { MapInterface } from '../../../../entities/interface/googlemaps';
import { jobDetailsState } from '../../../../store/atoms/jobDetailsState';
import { useRecoilState } from 'recoil';

const Map = styled.div`
	height: 45rem;
	width: 100%;

	&#route-map {
		height: 19rem;
	}
`

const FormActionsCustom = styled(FormActions)`
	padding: 0 2.6rem;
	margin: 1.2rem 0 3rem 0;
`

const JobAddStepOne = () => {
	const router = useRouter()
	const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)
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
	}, [jobDetails.geocoder_result])

	const nextPage = () => {
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
			<Map id="route-map" />
			<JobFormStepOne 
				mapID={{
					pickupMapID: "pickup-map-mobile",
					dropoffMapID: "dropoff-map-mobile",
					pickupAutoCompleteID: "pickup-atc-mobile",
					dropoffAutoCompleteID: "dropoff-atc-mobile"
				}} 
			/>
			<FormActionsCustom>
				<SecondaryButton onClick={() => router.push("/jobs")}>ยกเลิก</SecondaryButton>
				<PrimaryButton onClick={nextPage}>ส่วนถัดไป</PrimaryButton>
			</FormActionsCustom>
		</div>
	)
}

export default JobAddStepOne
