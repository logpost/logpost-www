import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { jobDetailsSelector, jobDetailsState } from '../../../store/atoms/jobDetailsState'
import { getJobDetailsByID, updateJob } from '../../../components/utilities/apis'
import { JobDocument, JobFormField } from '../../../entities/interface/job'
import JobFormStepOne from '../../../components/common/JobFormStepOne'
import JobFormStepTwo from '../../../components/common/JobFormStepTwo'
import JobFormStepThree from '../../../components/common/JobFormStepThree'
import { FormActions, JobTitle, PrimaryButton, SecondaryButton } from '../../../components/styles/GlobalComponents'
import Header from '../../../components/common/Header'
import { RightArrowLine } from '../../../components/common/Icons'
import JobDetailsSection from '../../../components/common/JobDetailsSection'
import { MapInterface } from '../../../entities/interface/googlemaps'
import { initMap, route } from '../../../components/utilities/googlemaps'
import { costCalculator } from '../../../components/utilities/costCalculater'
import useAlert from '../../../hooks/useAlert'

const Map = styled.div`
	height: 45rem;
	width: 100%;

	&#route-map {
		height: 19rem;
	}
`

const SectionHeader = styled.div`
    padding: 0 2.6rem;
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

const FormActionsCustom = styled(FormActions)`
	padding: 0 2.6rem;
	margin: 1.2rem 0 3rem 0;
`

const JobDetailsContainer = styled.div`
    margin: 1.8rem 2rem;
`;


const EditJobPage = () => {
    const router = useRouter()
    const jobID = router.query.job_id as string
    const [currentPage, setCurrentPage] = useState("edit")
    const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)
    const setJobDetailsSelector = useSetRecoilState(jobDetailsSelector)
    const [changedField, setChangedField] = useState<JobFormField>({})
    const [routeMap, setRouteMap] = useState<MapInterface>({
		map: null,
		directionsService: null,
		directionsRenderer: null
	})
    const { setAlert } = useAlert()

	useEffect(() => {
		initMap(document.getElementById("route-map") as HTMLElement, setRouteMap)
	}, [])

    useEffect(() => {
        console.log("geocoder effect")
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

    const handleUpdateJob = async () => {
        const updateJobDetails = {}
        Object.keys(changedField).map((key) => {
            if (changedField[key] === true) {
                updateJobDetails[key] = jobDetails[key]
            }
        })
        const isLocationChanged = (changedField.pickup_date === true || changedField.dropoff_date === true)
        if (isLocationChanged) {
            updateJobDetails["auto_price"] = parseInt(costCalculator(jobDetails.distance))
        }
        const response = await updateJob(jobID, updateJobDetails) 
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
		router.push(`/jobs`)
	}

    useEffect(() => {
        if (jobID) {
            getJobDetailsByID(jobID, (jobDocument: JobDocument) => {
                setJobDetailsSelector(jobDocument)
            })
        }
    }, [router.query])

    return (
        <div>
            <Header>
				<JobTitle>
					แก้ไขงาน <span>{jobDetails.pickup_location.province}</span>
					<RightArrowLine />
					<span>{jobDetails.dropoff_location.province}</span>
				</JobTitle>
			</Header>
                {currentPage === "edit" ? 
                    <>
			            <Map id="route-map" />
                        <JobFormStepOne changedField={changedField} setChangedField={setChangedField} />
                        <SectionHeader>
                            <div>ข้อมูลสินค้า</div> <Line />
                        </SectionHeader>
                        <JobFormStepTwo changedField={changedField} setChangedField={setChangedField} />
                        <SectionHeader>
                            <div>ข้อมูลรถบรรทุก</div> <Line />
                        </SectionHeader>
                        <JobFormStepThree changedField={changedField} setChangedField={setChangedField} />
                        <FormActionsCustom>
                            <SecondaryButton onClick={() => router.back()}>
                                ยกเลิก
                            </SecondaryButton>
                            <PrimaryButton onClick={() => setCurrentPage("sample")}>ดูตัวอย่างงาน</PrimaryButton>
			            </FormActionsCustom>
                    </> :
                    <JobDetailsContainer>
                        <JobDetailsSection 
                            isShowCarrierDetails={false}
                            isShowAutoPrice={false}
                        />
                        <FormActions>
                            <SecondaryButton onClick={() => setCurrentPage("edit")}>
                                กลับไปแก้ไข
                            </SecondaryButton>
                            <PrimaryButton onClick={handleUpdateJob}>ยืนยันแก้ไขงาน</PrimaryButton>
                        </FormActions>
                    </JobDetailsContainer> 
                } 
        </div>
    )
}

export default EditJobPage
