import React, { useEffect } from "react";
import Progress from "../../../common/Progress";
import styled from "styled-components";
import {
	FormActions,
	PrimaryButton,
	SecondaryButton,
	Detail,
	FormHeader
} from "../../../styles/GlobalComponents"
import JobDetailsSection from "../../../common/JobDetailsSection"
import { useRouter } from "next/router"
import { createJob } from "../../../utilities/apis"
import { JobDetails } from "../../../../entities/interface/job"
import { dateFormatter, timeFormatter } from "../../../utilities/helper"
import { useSetRecoilState } from 'recoil'
import { resourceCreatedState } from '../../../../store/atoms/overviewPageState'
import { initMap, route } from "../../../utilities/googlemaps"
import { MapInterface } from '../../../../entities/interface/googlemaps'
import { jobDetailsState } from '../../../../store/atoms/jobDetailsState'
import { costCalculator } from '../../../utilities/costCalculater'

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

const JobPrice = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: 500;
    color: hsl(0, 0%, 66%);

    ${Detail} {
        justify-content: flex-end;
    }

    > span {
        align-self: flex-end;
    }
`;

const Price = styled.div`
    font-size: 2rem;
    color: white;
    padding: 0.4rem 1.6rem;
    font-weight: 500;
    border-radius: 6px;
    background-color: hsl(212, 28%, 28%);
    height: fit-content;
`;

const JobAddStepFour = (props: { details: JobDetails }) => {
	const router = useRouter()
	const { details } = props
	const setCreateStatus = useSetRecoilState(resourceCreatedState)
	const setDetailsState = useSetRecoilState(jobDetailsState)

	const submitDetails = async () => {
		const {geocoder_result, ...jobDetails} = details
		jobDetails.auto_price = parseInt(costCalculator(jobDetails.distance))
		const response = await createJob(jobDetails)
		if (response !== 200) {
			setCreateStatus("error")
		} else {
			setCreateStatus("success")
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
