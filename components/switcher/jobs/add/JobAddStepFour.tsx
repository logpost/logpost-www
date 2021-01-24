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
import { JobDetails } from "../../../../entities/interface/job"
import { useSetRecoilState } from 'recoil'
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

const JobAddStepFour = (props: { details: JobDetails }) => {
	const router = useRouter()
	const { details } = props
	const setDetailsState = useSetRecoilState(jobDetailsState)
	const setAlert = useAlert()

	const submitDetails = async () => {
		const {geocoder_result, ...jobDetails} = details
		jobDetails.auto_price = parseInt(costCalculator(jobDetails.distance))
		const response = await createJob(jobDetails)
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
		router.push(`/jobs`)
	}

	useEffect(() => {
		initMap(document.getElementById("route-map") as HTMLElement, (routeMap: MapInterface) => {
			const place = details.geocoder_result
			const pickupLatLng = place.pickup.geometry.location
			const dropoffLatLng = place.dropoff.geometry.location
			route(pickupLatLng, dropoffLatLng, routeMap)
		})
		setDetailsState(details)
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
