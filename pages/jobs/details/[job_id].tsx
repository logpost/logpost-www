import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Header from "../../../components/common/Header"
import {
	WarningIcon,
	CopyIcon,
	RightArrowLine,
} from "../../../components/common/Icons"
import Progress from "../../../components/common/Progress"
import {
	DetailRow,
	Detail,
	SecondaryButton,
	PrimaryButton,
	JobTitle,
	CarrierDetailsContainer,
	FormActions
} from "../../../components/styles/GlobalComponents"
import NavigationBar from "../../../components/common/NavigationBar"
import DetailSection from "../../../components/common/DetailSection"
import Modal from "../../../components/common/Modal"
import { JOB_STATUS_CODE } from "../../../data/jobs"
import { useRecoilValue, useRecoilState } from 'recoil'
import { userInfoState } from "../../../store/atoms/userInfoState"
import { getJobDetailsByID, updateJob } from "../../../components/utilities/apis"
import { JobDocument } from '../../../entities/interface/job'
import { jobDetailsState } from '../../../store/atoms/jobDetailsState'
import { initMap, route } from "../../../components/utilities/googlemaps"
import { MapInterface } from "../../../entities/interface/googlemaps"
import { dateFormatter, timeFormatter } from "../../../components/utilities/helper"
import { resourceCreatedState } from "../../../store/atoms/overviewPageState"
import Alert from "../../../components/common/Alert"
import { alertPropertyState } from '../../../store/atoms/alertPropertyState'

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
`

const JobDetailsContainer = styled.div`
	margin: 1.8rem 2rem;
`

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

const HorizontalLine = styled.div`
	height: auto;
	background-color: hsl(212, 28%, 88%);
	width: 0.2rem;
	margin: 0 0.4rem;
`

const JobPrice = styled.div<{rowLayout: boolean}>`
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
		display: flex;
		flex-direction: ${(props) => props.rowLayout ? "row" : "column"};
		justify-content: ${(props) => props.rowLayout ? "space-between" : "flex-end"};
		align-items: flex-end;
		margin-left: ${(props) => props.rowLayout ? 0 : "1rem"};
		width: ${(props) => props.rowLayout ? "100%" : "auto"};;

		> span {
			white-space: nowrap;
		}
	}
`

const Price = styled.div`
	font-size: 2rem;
	color: white;
	padding: 0.4rem 1.6rem;
	font-weight: 500;
	border-radius: 6px;
	background-color: hsl(212, 28%, 28%);
	height: fit-content;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const SecondaryButtonCustom = styled(SecondaryButton)`
	padding: 0.6rem 0;
	width: 38%;
	border-radius: 0.6rem;
	font-weight: 600;
	height: fit-content;
`

const PrimaryButtonCustom = styled(SecondaryButtonCustom)`
	background-color: hsl(212, 28%, 28%);
	color: white;
	width: 51%;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 2rem;

	> button:not(:last-child) {
		margin-right: 1.6rem;
	}
`

const PriceDetailsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 2rem;
`

const PriceItem = styled.div`
	font-size: 1.6rem;
	color: hsl(218, 9%, 25%);
	font-weight: 500;

	> span {
		font-weight: 500;
		font-size: 1.2rem;
		color: hsl(0, 0%, 66%);
	}

	&:last-child {
		div {
			color: ${(props) => (props["data-price"] ? "green" : "red")};
		}
	}

	div {
		margin-top: 1.1rem;

		span {
			color: hsl(0, 0%, 51%);
		}
	}
`

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
`

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
`

const DisplayName = styled.span`
	max-width: 10rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`

const Map = styled.div`
	height: 45rem;
	width: 100%;

	&#route-map {
		height: 19rem;
	}
`

const JobDetailPage = () => {
	const userInfo = useRecoilValue(userInfoState)
	const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)
	const router = useRouter()
	const driverURLRef = useRef(null)
	const [isPositive, setIsPositive] = useState(true)
	const [toggleModal, setToggleModal] = useState(false)
	const createdStatus = useRecoilValue(resourceCreatedState)
	const [alertProperty, setAlertProperty] = useRecoilState(alertPropertyState)

	const isJobHasCarrier = jobDetails.status > 100
	const isJobStarted = jobDetails.status >= 300
	const isCarrier = (userInfo?.role === "carrier")
	const isShipperOwnedJob = (userInfo?.userID === jobDetails.shipper_id)
	const isCarrierOwnedJob = (userInfo?.userID === jobDetails.carrier_id)
	const isShipperCanEditDetails = (isShipperOwnedJob && !isJobHasCarrier)
	const isCarrierCanEditDetails = (isCarrierOwnedJob && !isJobStarted)
	const isLinkGenerated = (isJobStarted && isCarrierOwnedJob && (jobDetails.status !== 800))
	const isCarrierCanGetJob = (!isJobHasCarrier && isCarrier && !isCarrierOwnedJob)
	// const isUserCanSeeJobStatus = (isShipperOwnedJob || isCarrierOwnedJob)
	const jobID = router.query.job_id as string

	const calculateProfit = (offerPrice: number, autoPrice: number): string => {
		const profit = offerPrice - autoPrice
		if (profit < 0) {
			setIsPositive(false)
		}
		return profit.toLocaleString()
	}

	const copyToClipboard = (e) => {
		driverURLRef.current.select()
		document.execCommand("copy")
		e.target.focus()
	}

	useEffect(() => {
		if (jobID) {
			getJobDetailsByID(jobID, (jobDetails: JobDocument) => {
				setJobDetails(jobDetails)
				initMap(document.getElementById("route-map") as HTMLElement, (routeMap: MapInterface) => {
					const pickupLatLng = {
						latitude: jobDetails.pickup_location.latitude,
						longitude: jobDetails.pickup_location.longitude
					}
					const dropoffLatLng = {
						latitude: jobDetails.dropoff_location.latitude,
						longitude: jobDetails.dropoff_location.longitude
					} 
					route(pickupLatLng, dropoffLatLng, routeMap)
				})
				if (jobDetails.status >= 200) {

				}
			})
		}
	}, [router.query.job_id])

	useEffect(() => {
		setAlertProperty({
			type: createdStatus,
			isShow: Boolean(createdStatus)
		})
	}, [createdStatus])

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
			{
				alertProperty.isShow &&
				<Alert>
					{createdStatus === "success" ? "รับงานสำเร็จ" : "รับงานไม่สำเร็จ"}
				</Alert>
			}
			<NavigationBar />
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
				<DetailSection />
				{jobDetails.carrier_id && (
					<CarrierDetailsContainer>
						<Detail>
							ขนส่งโดย <span>{jobDetails.carrier_display_name}</span>
						</Detail>
						{/* <Detail>
							พนักงานขับรถ <span>{jobDetails.carrier_display_name}</span>
						</Detail>
						<Detail>
							ทะเบียนรถ <span>89-7280</span>
						</Detail> */}
					</CarrierDetailsContainer>
				)}
				{jobDetails.auto_price && (
					<PriceDetailsContainer>
						<PriceItem>
							ราคาเสนอ
							<div>
								{jobDetails.offer_price?.toLocaleString()} <span>บาท</span>
							</div>
						</PriceItem>
						<HorizontalLine />
						<PriceItem>
							ต้นทุน <span>ประมาณ</span>
							<div>
								{jobDetails.auto_price?.toLocaleString()} <span>บาท</span>
							</div>
						</PriceItem>
						<HorizontalLine />
						<PriceItem data-price={isPositive}>
							กำไร
							<div>
								{calculateProfit(
									jobDetails.offer_price,
									jobDetails.auto_price
								)}{" "}
								<span>บาท</span>
							</div>
						</PriceItem>
					</PriceDetailsContainer>
				)}
				<JobPrice rowLayout={isCarrier}>
					{
						!isCarrier &&
						<Price>{jobDetails.offer_price.toLocaleString()} บาท</Price>
					}
					<span>
						<Detail>
							โดย <DisplayName>{jobDetails.shipper_display_name}</DisplayName>
						</Detail>
						<span>{dateFormatter(jobDetails.dropoff_date)} {timeFormatter(jobDetails.dropoff_date)}</span>
					</span>
				</JobPrice>
				{isShipperCanEditDetails && (
					<ButtonContainer>
						<SecondaryButtonCustom>ลบงาน</SecondaryButtonCustom>
						<SecondaryButtonCustom>แก้ไขงาน</SecondaryButtonCustom>
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
