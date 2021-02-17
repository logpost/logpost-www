import React, { useEffect } from "react";
import Progress from "../../../common/Progress";
import styled from "styled-components";
import {
	FormActions,
	PrimaryButton,
	SecondaryButton,
	FormHeader
} from "../../../styles/GlobalComponents"
import JobDetailsSection from "../../../common/JobDetailsSection"
import { useRouter } from "next/router"
import { createJob } from "../../../utilities/apis"
import { useRecoilValue } from 'recoil'
import { initMap, route } from "../../../utilities/googlemaps"
import { MapInterface } from '../../../../entities/interface/googlemaps'
import { jobDetailsState } from '../../../../store/atoms/jobDetailsState'
import { costCalculator } from '../../../utilities/costCalculater'
import useAlert from "../../../../hooks/useAlert";

const Map = styled.div`
    height: 45rem;
    width: 100%;

    &#route-map {
        height: 19rem;
    }
`;

const JobDetailsContainer = styled.div`
    margin: 1.8rem 2rem;
`;

const JobAddStepFour = () => {
	const router = useRouter()
	const jobDetails = useRecoilValue(jobDetailsState)
	const { setAlert } = useAlert()

	const submitDetails = async () => {
		const {geocoder_result, ...details} = jobDetails
		details.auto_price = parseInt(costCalculator(details.distance))
		const response = await createJob({ 
			...details,
			waiting_time: details.waiting_time || 0
		})
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
		router.push(`/jobs`)
	}

	useEffect(() => {
		initMap(document.getElementById("route-map") as HTMLElement, (routeMap: MapInterface) => {
			const { pickup, dropoff } = jobDetails.geocoder_result
			const pickupLatLng = (pickup as google.maps.places.PlaceResult).geometry.location
			const dropoffLatLng = (dropoff as google.maps.places.PlaceResult).geometry.location
			route(pickupLatLng, dropoffLatLng, routeMap)
		})
	}, [])

	return (
		<div>
			<FormHeader>
				<Progress currentStep="ตัวอย่างงาน" percent={4 / 4} />
			</FormHeader>
			<Map id="route-map" />
			<JobDetailsContainer>
				<JobDetailsSection 
					isShowCarrierDetails={false}
					isShowAutoPrice={false}
				/>
				<FormActions>
					<SecondaryButton onClick={() => router.push(`/jobs/add/3`)}>
						ย้อนกลับ
					</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>สร้างงาน</PrimaryButton>
				</FormActions>
			</JobDetailsContainer>
		</div>
	)
}

export default JobAddStepFour;
