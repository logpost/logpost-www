import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Header from "../../../components/common/Header"
import {
	AlertIcon,
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
import appStore from "../../../store/AppStore"
import { view } from "@risingstack/react-easy-state"
import { JOB_STATUS_CODE } from "../../../data/jobs"
import { MOCKUP_JOB } from "../../../data/job.mock"

interface JobDetailsInterface {
	role: string
	status: number
}

const PAGE_TEST = [
	{
		user_id: "00",
		role: "carrier",
		status: 100,
	},
]

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

const JobMap = styled.div`
	background: url(/images/job-map.png) no-repeat;
	background-size: contain;
	height: 19rem;
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

	> *:not(:last-child) {
		margin-bottom: 1.6rem;
	}

	span:not(:last-child) {
		line-height: 3.24rem;
		padding: 0 1.2rem;
	}

	${FormActions} {
		${SecondaryButton}, ${PrimaryButton}	{
			font-size: 1.6rem;
			box-shadow: none;
			margin-top: 0;
			height: fit-content;
			font-weight: 500;
		}
	}
`

const HorizontalLine = styled.div`
	height: auto;
	background-color: hsl(212, 28%, 88%);
	width: 0.2rem;
	margin: 0 0.4rem;
`

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
`

const Price = styled.div`
	font-size: 2rem;
	color: white;
	padding: 0.4rem 1.6rem;
	font-weight: 500;
	border-radius: 6px;
	background-color: hsl(212, 28%, 28%);
	height: fit-content;
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

const JobDetailPage = (props: JobDetailsInterface) => {
	const { role, status, user_id } = PAGE_TEST[0]
	const router = useRouter()
	const driverURLRef = useRef(null)
	const { job_id } = router.query
	const [isPositive, setIsPositive] = useState(true)
	const [toggleModal, setToggleModal] = useState(false)


	const isJobHasCarrier = status > 100
	const isJobStarted = status >= 300
	const isCarrier = (role === "carrier")
	const isShipperOwnedJob = (user_id === MOCKUP_JOB.shipper_id)
	const isCarrierOwnedJob = (user_id === MOCKUP_JOB.carrier_id)
	const isShipperCanEditDetails = (isShipperOwnedJob && !isJobHasCarrier)
	const isCarrierCanEditDetails = (isCarrierOwnedJob && !isJobStarted)
	const isLinkGenerated = (isJobStarted && isCarrierOwnedJob)
	const isCarrierCanGetJob = (!isJobHasCarrier && isCarrier && !isCarrierOwnedJob)
	const isUserCanSeeJobStatus = (isShipperOwnedJob || isCarrierOwnedJob)

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

	return (
		<PageContainer bottomSpace={isLinkGenerated}>
			<NavigationBar />
			{isLinkGenerated && (
				<DriverURLContainer>
					<div>
						<AlertIcon />
						คัดลอกลิงก์และส่งให้พนักงานขับรถ
					</div>
					<URLContainer>
						<input ref={driverURLRef} value="logpost.com/WfdAG" readOnly />
						<button onClick={copyToClipboard}>
							<CopyIcon />
						</button>
					</URLContainer>
				</DriverURLContainer>
			)}
			<Header>
				<JobTitle>
					งาน กรุงเทพ
					<RightArrowLine />
					ชลบุรี
				</JobTitle>
			</Header>
			<JobMap />
			<JobDetailsContainer>
				{isUserCanSeeJobStatus && (
					<Progress
						currentStep={JOB_STATUS_CODE[status].status_name}
						nextStep={
							JOB_STATUS_CODE[JOB_STATUS_CODE[status].next] &&
							JOB_STATUS_CODE[JOB_STATUS_CODE[status].next].status_name
						}
						percent={JOB_STATUS_CODE[status].progress / 6}
						label="สถานะ"
					/>
				)}
				<DetailSection details={MOCKUP_JOB} />
				{isJobHasCarrier && (
					<CarrierDetailsContainer>
						{!isCarrier && (
							<Detail>
								ขนส่งโดย <span>ล็อกโพสต์ ขนส่ง จำกัด</span>
							</Detail>
						)}
						<Detail>
							พนักงานขับรถ <span>คนขับหนึ่ง</span>
						</Detail>
						<Detail>
							ทะเบียนรถ <span>89-7280</span>
						</Detail>
					</CarrierDetailsContainer>
				)}
				{isCarrier && (
					<PriceDetailsContainer>
						<PriceItem>
							ราคาเสนอ
							<div>
								{MOCKUP_JOB.offer_price.toLocaleString()} <span>บาท</span>
							</div>
						</PriceItem>
						<HorizontalLine />
						<PriceItem>
							ต้นทุน <span>ประมาณ</span>
							<div>
								{MOCKUP_JOB.auto_price.toLocaleString()} <span>บาท</span>
							</div>
						</PriceItem>
						<HorizontalLine />
						<PriceItem data-price={isPositive}>
							กำไร
							<div>
								{calculateProfit(
									MOCKUP_JOB.offer_price,
									MOCKUP_JOB.auto_price
								)}{" "}
								<span>บาท</span>
							</div>
						</PriceItem>
					</PriceDetailsContainer>
				)}
				{!isCarrier && (
					<JobPrice>
						<Price>8,000 บาท</Price>
						<span>
							{!isShipperOwnedJob && (
								<Detail>
									โดย <span>ล็อกค้าไม้</span>
								</Detail>
							)}
							<span>18 ต.ค. 63 13.00 น.</span>
						</span>
					</JobPrice>
				)}
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
								<AlertIcon />
								<span>เมื่อยืนยันเริ่มงานแล้วจะ<b>ไม่สามารถ</b><br />- แก้ไขพนักงานขับรถ<br />- ยกเลิกงาน<br /></span>
								<b>ยืนยันเริ่มงานหรือไม่ ?</b>
								<FormActions>
									<SecondaryButton onClick={() => setToggleModal(false)}>ย้อนกลับ</SecondaryButton>
									<PrimaryButton onClick={() => setToggleModal(false)}>ยืนยันเริ่มงาน</PrimaryButton>
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
						<PrimaryButtonCustom onClick={() => router.push(`/jobs/get/${job_id}`)}>
							รับงาน
						</PrimaryButtonCustom>
					</ButtonContainer>
				)}
			</JobDetailsContainer>
		</PageContainer>
	)
}

export default view(JobDetailPage)
