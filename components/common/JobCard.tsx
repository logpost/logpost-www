import React, { useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { DetailRow, PrimaryButton, SecondaryButton, FormActions, TextButton } from "../styles/GlobalComponents"
import {
	DownArrowLine,
	PersonIcon,
	ProductIcon,
	RightArrowLine,
	TruckIcon,
	UpArrowLine,
	NoteIcon,
	WarningIcon
} from "./Icons"
import { JobDocument } from "../../entities/interface/job"
import { dateFormatter, timeFormatter } from "../utilities/helper"
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../store/atoms/userInfoState'
import Modal from "./Modal"

interface JobCardInterface {
	origin: string
	details: JobDocument
}

const CardContainer = styled.div`
	display: flex;
	padding: 1.8rem 2rem;
	flex-direction: column;
	font-size: 14px;
	font-weight: 500;

	&:nth-child(even) {
		background-color: hsl(220, 27%, 96%);
	}

	> div:not(:last-child) {
		margin-bottom: 1.2rem;
	}

	${DetailRow} {
		grid-gap: 1.2rem 0.2rem;
		margin-bottom: 1.2rem;
	}
`

const BottomDetails = styled.div`
	display: grid;
	grid-template-columns: 2fr auto;

	${DetailRow} {
		display: flex;
		flex-wrap: wrap;
	}
`

const Locations = styled.div`
	display: flex;
	max-width: 40rem;
	font-size: 1.8rem;
	font-weight: bold;
	color: hsl(217, 16%, 16%);

	> span {
		max-width: 10rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	> svg {
		min-width: 2.7rem;
		margin: 0 1.4rem;
	}
`

const DateAndTime = styled.div`
	display: flex;
	white-space: nowrap;

	svg {
		margin-right: 0.6rem;
	}

	span {
		margin: 0 0.8rem;
	}
`

const SecondaryButtonCustom = styled(SecondaryButton)`
	box-shadow: none;
	border-width: 1px;
	font-size: 1.2rem;
	padding: 0.4rem 1.2rem;
	align-self: flex-end;
`

const DetailColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	> span {
		font-size: 1.8rem;
		margin-bottom: 0.6rem;
	}
`

const CardActions = styled(DetailColumn)`
	justify-content: flex-end;
`

const Detail = styled.div`
	display: flex;
	margin-right: 1.6rem;

	span {
		width: 80%;
		line-height: 170%;
	}

	svg {
		width: 20px;
		height: 20px;
		margin-right: 1rem;

		path {
			stroke: hsl(16, 56%, 51%);

			&#note {
				stroke: none;
			}

			&#person {
				stroke-width: 0.2rem;
			}

			&#truck {
				stroke-width: 0.3rem;
			}
		}
	}
`

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 2.3rem;
	padding: 0 2rem;

	> *:not(:last-child) {
		margin-bottom: 1.6rem;
	}

	span:not(:last-child) {
		line-height: 3.24rem;
		padding: 0 1.2rem;
	}

	${TextButton} {
		font-size: 1.8rem;
	}

	${FormActions} {
		> ${SecondaryButton}, ${PrimaryButton} {
			font-size: 1.8rem;
			box-shadow: none;
			font-weight: 500;
			padding: 0.4rem 2rem;
		}
	}
`

const JobCard = (props: JobCardInterface) => {
	const { origin, details } = props
	const userInfo = useRecoilValue(userInfoState)
	const [toggleModal, setToggleModal] = useState(false)
	const router = useRouter()

	const seeMoreDetails = () => {
		if (Boolean(userInfo)) { 
			router.push(`/jobs/details/${details.job_id}`)
		} else {
			setToggleModal(true)
		}
	}

	return (
		<CardContainer>
			<Locations>
				<span>{details.pickup_location}</span>
				<RightArrowLine />
				<span>{details.dropoff_location}</span>
			</Locations>
			<DetailRow>
				<DateAndTime>
					<UpArrowLine />
					{dateFormatter(details.pickup_date)} <span>|</span> {timeFormatter(details.pickup_date)}
				</DateAndTime>
				<DateAndTime>
					<DownArrowLine />
					{dateFormatter(details.dropoff_date)} <span>|</span> {timeFormatter(details.dropoff_date)}
				</DateAndTime>
			</DetailRow>
			<BottomDetails>
				<DetailColumn>
					<DetailRow>
						<Detail>
							<TruckIcon />
							{details.truck_type}
						</Detail>
						<Detail>
							<ProductIcon />
							{details.product_type} {details.weight} ตัน
						</Detail>
					</DetailRow>
					<Detail>
						{
							origin === "jobs-page" ?
								details.description && <><NoteIcon /><span>{details.description}</span></>
								: <PersonIcon />
						}
					</Detail>
				</DetailColumn>
				<CardActions>
					{ details.offer_price && 
						<span>{details.offer_price.toLocaleString()} บาท</span>
					}
					<SecondaryButtonCustom onClick={seeMoreDetails}>รายละเอียด</SecondaryButtonCustom>
				</CardActions>
				<Modal toggle={toggleModal} setToggle={setToggleModal}>
					<ModalContent>
						<WarningIcon />
						<span>ลงทะเบียน LOGPOST<br/>เพื่ออ่านรายละเอียด</span>
						<FormActions>
							<SecondaryButton onClick={() => setToggleModal(false)}>ย้อนกลับ</SecondaryButton>
							<PrimaryButton onClick={() => router.push("/")}>ลงทะเบียน</PrimaryButton>
						</FormActions>
						<TextButton onClick={() => router.push("/login")}>เข้าสู่ระบบ</TextButton>
					</ModalContent>
				</Modal>
			</BottomDetails>
		</CardContainer>
	)
}

export default JobCard
