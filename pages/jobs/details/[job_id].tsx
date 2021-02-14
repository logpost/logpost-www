import Alert from '../../../components/common/Alert';
import Header from '../../../components/common/Header';
import JobDetailsSection from '../../../components/common/JobDetailsSection';
import Modal from '../../../components/common/Modal';
import NavigationBar from '../../../components/common/NavigationBar';
import Progress from '../../../components/common/Progress';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { alertPropertyState } from '../../../store/atoms/alertPropertyState';
import {
	DetailRow,
	FormActions,
	JobTitle,
	PrimaryButton,
	SecondaryButton
	} from '../../../components/styles/GlobalComponents';
import { getJobDetailsByID, updateJob } from '../../../components/utilities/apis';
import { initMap, route } from '../../../components/utilities/googlemaps';
import { JOB_STATUS_CODE } from '../../../data/jobs';
import { jobDetailsSelector, jobDetailsState } from '../../../store/atoms/jobDetailsState';
import { JobDocument } from '../../../entities/interface/job';
import { MapInterface } from '../../../entities/interface/googlemaps';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '../../../store/atoms/userInfoState';
import { useRouter } from 'next/router';
import {
    WarningIcon,
    CopyIcon,
    RightArrowLine,
} from "../../../components/common/Icons";

const PageContainer = styled.div<{ bottomSpace: boolean }>`
    margin-bottom: ${(props) => (props.bottomSpace ? 19 : 8)}rem;

    ${DetailRow} {
        > span {
            align-self: flex-end;
            font-size: 1.4rem;
            font-weight: 500;
            color: hsl(0, 0%, 66%);
        }
    }
`;

const JobDetailsContainer = styled.div`
    margin: 1.8rem 2rem;
`;

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	white-space: nowrap;
	padding: 0 2rem;

	> *:not(:last-child) {
		margin-bottom: 1.6rem;
	}

	span:not(:last-child) {
		line-height: 3.24rem;
		padding: 0 1.2rem;
	}

	${FormActions} {
		${SecondaryButton}, ${PrimaryButton}	{
			font-size: 1.8rem;
			box-shadow: none;
			height: fit-content;
			font-weight: 500;
			padding: 0.4rem 2rem;
		}
	}
`

const SecondaryButtonCustom = styled(SecondaryButton)`
    padding: 0.6rem 0;
    width: 38%;
    border-radius: 0.6rem;
    font-weight: 600;
    height: fit-content;
`;

const PrimaryButtonCustom = styled(SecondaryButtonCustom)`
    background-color: hsl(212, 28%, 28%);
    color: white;
    width: 51%;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;

    > button:not(:last-child) {
        margin-right: 1.6rem;
    }
`;

const DriverURLContainer = styled.div`
    position: fixed;
    bottom: 6.2rem;
    z-index: 1;
    background-color: white;
    font-weight: 600;
    font-size: 1.8rem;
    box-shadow: 0 -8px 20px 0 hsla(0, 0%, 0%, 0.06);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.2rem 0;

    > div {
        display: flex;
        align-items: center;
        margin-bottom: 0.8rem;

        > svg {
            margin-right: 0.5rem;
            height: 2.6rem;
            width: 2.6rem;
        }
    }
`;

const URLContainer = styled.div`
    > input {
        font-size: 1.8rem;
        padding: 0.9rem 1.2rem;
        border: solid 1px hsl(212, 28%, 28%);
        border-top-left-radius: 0.6rem;
        border-bottom-left-radius: 0.6rem;
        color: hsl(212, 28%, 28%);
    }

    > button {
        background-color: hsl(212, 28%, 28%);
        padding: 0.8rem;
        border: solid 1px hsl(212, 28%, 28%);
        border-top-right-radius: 0.6rem;
        border-bottom-right-radius: 0.6rem;
    }
`;

const Map = styled.div`
    height: 45rem;
    width: 100%;

    &#route-map {
        height: 19rem;
    }
`;

const JobDetailPage = () => {
	const userInfo = useRecoilValue(userInfoState)
	const [jobDetails, setJobDetails] = useRecoilState(jobDetailsSelector)
	const router = useRouter()
	const driverURLRef = useRef(null)
	const [toggleModal, setToggleModal] = useState(false)
	const alertStatus = useRecoilValue(alertPropertyState)

	const isJobHasCarrier = jobDetails.status > 100
	const isJobStarted = jobDetails.status >= 300
	const isCarrier = (userInfo?.role === "carrier")
	const isShipperOwnedJob = (userInfo?.userID === jobDetails.shipper_id)
	const isCarrierOwnedJob = (userInfo?.userID === jobDetails.carrier_id)
	const isShipperCanEditDetails = (isShipperOwnedJob && !isJobHasCarrier)
	const isCarrierCanEditDetails = (isCarrierOwnedJob && !isJobStarted)
	const isLinkGenerated = (isJobStarted && isCarrierOwnedJob && (jobDetails.status !== 800))
	const isCarrierCanGetJob = (!isJobHasCarrier && isCarrier && !isCarrierOwnedJob)
	const jobID = router.query.job_id as string

	const copyToClipboard = () => {
		driverURLRef.current.select()
		document.execCommand("copy")
	}

	useEffect(() => {
		if (jobID) {
			getJobDetailsByID(jobID, (jobDocument: JobDocument) => {
                setJobDetails(jobDocument)
				// initMap(document.getElementById("route-map") as HTMLElement, (routeMap: MapInterface) => {
				// 	const pickupLatLng = {
				// 		latitude: jobDetails.pickup_location.latitude,
				// 		longitude: jobDetails.pickup_location.longitude
				// 	}
				// 	const dropoffLatLng = {
				// 		latitude: jobDetails.dropoff_location.latitude,
				// 		longitude: jobDetails.dropoff_location.longitude
				// 	} 
				// 	route(pickupLatLng, dropoffLatLng, routeMap)
				// })
            })
		}
	}, [router.query.job_id])

	const startJob = async () => {
		const response = await updateJob({
			jobinfo: { 
				"status": 300
			},
			job_id: jobID
		})
		setToggleModal(false)
	}

	return (
		<PageContainer bottomSpace={isLinkGenerated}>
			<Alert>
				{alertStatus.type === "success" ? "เลือกงานสำเร็จ" : "เลือกงานไม่สำเร็จ"}
			</Alert>
			<NavigationBar activeIndex={1} />
			{isLinkGenerated && (
				<DriverURLContainer>
					<div>
						<WarningIcon />
						คัดลอกลิงก์และส่งให้พนักงานขับรถ
					</div>
					<URLContainer>
						<input ref={driverURLRef} value={`localhost:3000/driver/${jobID}`} readOnly />
						<button onClick={copyToClipboard}>
							<CopyIcon />
						</button>
					</URLContainer>
				</DriverURLContainer>
			)}
			<Header>
				<JobTitle>
					งาน <span>{jobDetails.pickup_location.province}</span>
					<RightArrowLine />
					<span>{jobDetails.dropoff_location.province}</span>
				</JobTitle>
			</Header>
			<Map id="route-map" />
			<JobDetailsContainer>
				{jobDetails.status && (
					<Progress
						currentStep={JOB_STATUS_CODE[jobDetails.status]?.status_name}
						nextStep={JOB_STATUS_CODE[JOB_STATUS_CODE[jobDetails.status]?.next]?.status_name}
						percent={JOB_STATUS_CODE[jobDetails.status]?.progress / 6}
						label="สถานะ"
					/>
				)}
				<JobDetailsSection 
					isShowCarrierDetails={jobDetails.status > 100}
					isShowAutoPrice={userInfo?.role === "carrier"}
				/>
				{isShipperCanEditDetails && (
					<ButtonContainer>
						<SecondaryButtonCustom>ลบงาน</SecondaryButtonCustom>
						<SecondaryButtonCustom onClick={() => router.push(`/jobs/edit/${jobDetails.job_id}`)}>แก้ไขงาน</SecondaryButtonCustom>
					</ButtonContainer>
				)}
				{isCarrierCanEditDetails && (
					<>
						<Modal toggle={toggleModal} setToggle={setToggleModal}>
							<ModalContent>
								<WarningIcon />
								<span>เมื่อยืนยันเริ่มงานแล้วจะ<b>ไม่สามารถ</b><br />- แก้ไขพนักงานขับรถ<br />- ยกเลิกงาน<br /></span>
								<b>ยืนยันเริ่มงานหรือไม่ ?</b>
								<FormActions>
									<SecondaryButton onClick={() => setToggleModal(false)}>ย้อนกลับ</SecondaryButton>
									<PrimaryButton onClick={startJob}>ยืนยันเริ่มงาน</PrimaryButton>
								</FormActions>
							</ModalContent>
						</Modal>
						<ButtonContainer>
							<SecondaryButtonCustom>ยกเลิก</SecondaryButtonCustom>
							<SecondaryButtonCustom>แก้ไข</SecondaryButtonCustom>
							<PrimaryButtonCustom onClick={() => setToggleModal(true)}>
								เริ่มงาน
							</PrimaryButtonCustom>
						</ButtonContainer>
					</>
				)}
				{isCarrierCanGetJob && (
					<ButtonContainer>
						<PrimaryButtonCustom onClick={() => router.push(`/jobs/get/${jobID}`)}>
							รับงาน
						</PrimaryButtonCustom>
					</ButtonContainer>
				)}
			</JobDetailsContainer>
		</PageContainer>
	)
}

export default JobDetailPage
