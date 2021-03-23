import React, { useState } from 'react'
import Header from '../../components/common/Header'
import styled from 'styled-components'
import { JobTitle, PrimaryButton, Detail, SecondaryButton } from '../../components/styles/GlobalComponents'
import { useRouter } from 'next/router'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { getJobDetailsByID, updateStatusByDriver } from '../../components/utilities/apis'
import { JobDocument } from '../../entities/interface/job'
import { initMap, route } from "../../components/utilities/googlemaps"
import { MapInterface } from "../../entities/interface/googlemaps"
import { RightArrowLine } from '../../components/common/Icons'
import Progress from '../../components/common/Progress'
import { JOB_STATUS_CODE } from '../../data/jobs'
import JobDetailsSection from '../../components/common/JobDetailsSection'
import Modal from '../../components/common/Modal'
import InputComponent from '../../components/common/InputComponent'
import { jobDetailsSelector, jobDetailsState } from '../../store/atoms/jobDetailsState'
import withPrivateRoute from '../../components/utilities/withPrivateRoute'

const JobDocumentContainer = styled.div`
	margin: 1.8rem 2rem;
`

const Map = styled.div`
	height: 45rem;
	width: 100%;

	&#route-map {
		height: 19rem;
	}
`

const ModalContent = styled.div`
	padding: 2rem 2rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 2rem;
	font-weight: 500;

	> span {
		margin-bottom: 2rem;
	}

	> button {
		margin-top: 2rem;
	}
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 2rem;

	> button:not(:last-child) {
		margin-right: 1.6rem;
	}
`

const SecondaryButtonCustom = styled(SecondaryButton)`
	padding: 0.6rem 0;
	width: 38%;
	border-radius: 0.6rem;
	font-weight: 600;
	height: fit-content;
`

const ChangeStatusContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 1.8rem;
	font-weight: 500;
	color: hsl(218, 28%, 28%);
	margin-top: 2rem;

	> button {
		margin-top: 1.4rem;
	}
`

const DriverPage = () => {
	const router = useRouter()
	const jobID = router.query.job_id as string
	const [driverTel, setDriverTel] = useState("")
	const [jobDetails, setJobDetails] = useRecoilState<JobDocument>(jobDetailsState)
	const setJobDetailsSelector = useSetRecoilState(jobDetailsSelector)
	const [toggleModal, setToggleModal] = useState(true)

	const changeStatus = async () => {
		const newStatus = JOB_STATUS_CODE[jobDetails.status]?.next
		const response = await updateStatusByDriver({
			driver_tel: driverTel,
			jobinfo: { 
				status: newStatus
			},
			job_id: jobID
		})
		setJobDetails({
			...jobDetails,
			status: newStatus
		})
	}

	const confirmDriverTel = () => {
		getJobDetailsByID(jobID, (jobDocument: JobDocument) => {
			setJobDetailsSelector(jobDocument)
			setToggleModal(false)
			initMap(document.getElementById("route-map") as HTMLElement, (routeMap: MapInterface) => {
				const pickupLatLng = {
					latitude: jobDocument.pickup_location.latitude,
					longitude: jobDocument.pickup_location.longitude
				}
				const dropoffLatLng = {
					latitude: jobDocument.dropoff_location.latitude,
					longitude: jobDocument.dropoff_location.longitude
				} 
				route(pickupLatLng, dropoffLatLng, routeMap)
			})
		}, driverTel)
	}

	return (
		<div>
			<Header>
				<JobTitle>
					งาน <span>{jobDetails.pickup_location.province}</span>
					<RightArrowLine />
					<span>{jobDetails.dropoff_location.province}</span>
				</JobTitle>
			</Header>
			<Map id="route-map" />
			<JobDocumentContainer>
				{jobDetails.status && (
					<Progress
						currentStep={JOB_STATUS_CODE[jobDetails.status]?.status_name}
						nextStep={JOB_STATUS_CODE[JOB_STATUS_CODE[jobDetails.status]?.next]?.status_name}
						percent={JOB_STATUS_CODE[jobDetails.status]?.progress / 6}
						label="สถานะ"
					/>
				)}
				{
				jobDetails.status !== 800 && 
					<ChangeStatusContainer>
						กดปุ่มเพื่อเปลี่ยนสถานะ
						<PrimaryButton onClick={changeStatus}>{JOB_STATUS_CODE[JOB_STATUS_CODE[jobDetails.status]?.next]?.status_name}</PrimaryButton>
					</ChangeStatusContainer>
				}
				<JobDetailsSection 
					isShowAutoPrice={false}
					isShowFooterDetails={false}
				/>
				<ButtonContainer>
					<SecondaryButtonCustom>แจ้งปัญหา</SecondaryButtonCustom>
					<SecondaryButtonCustom>ติดต่อผู้ส่ง</SecondaryButtonCustom>
				</ButtonContainer>
			</JobDocumentContainer>
			<Modal toggle={toggleModal} setToggle={setToggleModal}>
				<ModalContent>
					<span>กรุณากรอกเบอร์โทรศัพท์</span>
					<InputComponent 
						name="tel"
						value={driverTel}
						disableLabel={true}
						handleOnChange={(e) => setDriverTel(e.target.value)}
					/>
					<PrimaryButton onClick={confirmDriverTel}>ยืนยัน</PrimaryButton>
				</ModalContent>
			</Modal>
		</div>
	)
}

export default DriverPage
