import React, { useEffect } from "react";
import Progress from "../../../common/Progress";
import styled, { css } from "styled-components";
import {
	FormActions,
	PrimaryButton,
	SecondaryButton,
	FormHeader,
	HeaderTitle
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
import { BreakpointLG, BreakpointMD } from "../../../styles/Breakpoints";
import DesktopHeader from "../../../common/DesktopHeader";
import { RightArrowLine } from "../../../common/Icons";
import breakpointGenerator from "../../../utilities/breakpoint";
import Alert from "../../../common/Alert";

const MapContainer = styled.div`
	padding: 1.8rem 2.6rem 0;
	max-width: 110rem;
`

const Map = styled.div`
    height: 45rem;
    width: 100%;

    &#route-map {
        height: 19rem;

		${breakpointGenerator({
			large: css`
				border-radius: 14px;
				height: 100%;
			`
		})}
    }
`;

const JobDetailsContainer = styled.div`
    margin: 1.8rem 2rem;
`;

const HeaderTitleCustom = styled(HeaderTitle)`
	color: hsl(212, 28%, 28%);
	
	> span {
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 0.8rem;
	}

	svg {
		margin: 0 1.4rem;

		path {
			fill: hsl(212, 28%, 28%);
		}
	}
`

const ContentContainer = styled.div`
	${breakpointGenerator({
		large: css`
			display: grid;
			grid-template-columns: 1fr 1fr;
			max-width: 110rem;
		`
	})}
`

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
			setAlert(true, "error", "ไม่สามารถสร้างงานได้ เนื่องจากข้อผิดพลาดบางอย่าง")
		} else {
			setAlert(true, "success", "สร้างงานสำเร็จ")
			router.push(`/jobs`)
		}
	}

	useEffect(() => {
		initMap(document.getElementById("route-map") as HTMLElement, (routeMap: MapInterface) => {
			const { pickup, dropoff } = jobDetails.geocoder_result
			const pickupLatLng = (pickup as google.maps.places.PlaceResult).geometry?.location
			const dropoffLatLng = (dropoff as google.maps.places.PlaceResult).geometry?.location
			route(pickupLatLng, dropoffLatLng, routeMap)
		})
	}, [])

	return (
		<>
			<Alert />
			<BreakpointMD>
				<FormHeader>
					<Progress currentStep="ตัวอย่างงาน" percent={4 / 4} />
				</FormHeader>
			</BreakpointMD>
			<BreakpointLG>
				<DesktopHeader>
					<HeaderTitleCustom>
						งาน <span>{jobDetails.pickup_location.province}</span>
						<RightArrowLine />
						<span>{jobDetails.dropoff_location.province}</span>
					</HeaderTitleCustom>
				</DesktopHeader>
			</BreakpointLG>
			<ContentContainer>
				<MapContainer>
					<Map id="route-map" />
				</MapContainer>
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
			</ContentContainer>
		</>
	)
}

export default JobAddStepFour;
