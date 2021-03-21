import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import JobAddStepOne from '../../../components/switcher/jobs/add/JobAddStepOne'
import JobAddStepTwo from '../../../components/switcher/jobs/add/JobAddStepTwo'
import JobAddStepThree from '../../../components/switcher/jobs/add/JobAddStepThree'
import JobAddStepFour from '../../../components/switcher/jobs/add/JobAddStepFour'
import { BreakpointLG, BreakpointMD } from '../../../components/styles/Breakpoints'
import NavigationBar from '../../../components/common/NavigationBar'
import DesktopHeader from '../../../components/common/DesktopHeader'
import { FormActions, HeaderTitle, HeaderTitleContainer, PrimaryButton, SecondaryButton } from '../../../components/styles/GlobalComponents'
import styled from 'styled-components'
import JobFormStepOne from '../../../components/common/JobFormStepOne'
import { useRecoilState } from 'recoil'
import { jobDetailsState } from '../../../store/atoms/jobDetailsState'
import { MapInterface } from '../../../entities/interface/googlemaps'
import { initMap, route } from '../../../components/utilities/googlemaps'
import JobFormStepThree from '../../../components/common/JobFormStepThree'
import JobFormStepTwo from '../../../components/common/JobFormStepTwo'

const MapContainer = styled.div`
	padding: 1.8rem 2.6rem 0;
	max-width: 110rem;
`

const Map = styled.div`
	height: 45rem;
	width: 100%;
	border-radius: 14px;

	&#route-map-desktop {
		height: 19rem;
	}
`

const JobFormContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 2rem;
	margin-top: 2.6rem;
	max-width: 110rem;
`

const SectionHeader = styled.div`
	font-size: 2rem;
	font-weight: 600;
	color: hsl(16, 56%, 51%);
	display: flex;
	align-items: center;
	height: 2.5rem;
	padding: 1.8rem 2.6rem;

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

const FormActionsCustom = styled(FormActions)`
	padding: 0 2.6rem;
	margin: 1.2rem 0 3rem 0;
`


const AddJobSwitcherPage = () => {
	const router = useRouter()
	const { step } = router.query
	const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)
	const [routeMap, setRouteMap] = useState<MapInterface>({
		map: null,
		directionsService: null,
		directionsRenderer: null
	})

	useEffect(() => {
		initMap(document.getElementById("route-map-desktop") as HTMLElement, setRouteMap)
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

	return (
		<>
			<BreakpointMD>
				{
					{
						1: <JobAddStepOne />,
						2: <JobAddStepTwo />,
						3: <JobAddStepThree />,
						4: <JobAddStepFour />,
					}[step as string]
				}
			</BreakpointMD>
			<NavigationBar activeIndex={1} />
			<BreakpointLG>
				<DesktopHeader>
					<HeaderTitleContainer>
						<HeaderTitle>สร้างงานใหม่</HeaderTitle>
					</HeaderTitleContainer>
				</DesktopHeader>
				<MapContainer>
					<Map id="route-map-desktop" />
				</MapContainer>
				<JobFormStepOne 
					mapID={{
						pickupMapID: "pickup-map-desktop",
						dropoffMapID: "dropoff-map-desktop",
						pickupAutoCompleteID: "pickup-atc-desktop",
						dropoffAutoCompleteID: "dropoff-atc-desktop"
					}}  
				/>
				<JobFormContainer>
					<div>
						<SectionHeader>
							<div>สินค้า</div> <Line />
						</SectionHeader>
						<JobFormStepTwo />
					</div>
					<div>
						<SectionHeader>
							<div>รถบรรทุก</div> <Line />
						</SectionHeader>
						<JobFormStepThree />
						<FormActionsCustom>
							<SecondaryButton onClick={() => router.push("/jobs")}>ยกเลิก</SecondaryButton>
							<PrimaryButton onClick={() => router.push("example")}>ดูตัวอย่างงาน</PrimaryButton>
						</FormActionsCustom>
					</div>
				</JobFormContainer>
			</BreakpointLG>
		</>
	)
}

export default AddJobSwitcherPage
