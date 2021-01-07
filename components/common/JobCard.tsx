import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { DetailRow, PrimaryButton, SecondaryButton } from "../styles/GlobalComponents"
import {
	DownArrowLine,
	PersonIcon,
	ProductIcon,
	RightArrowLine,
	TruckIcon,
	UpArrowLine,
	NoteIcon
} from "./Icons"
import { JobInterface } from "../../entities/interface/job"

interface JobCardInterface {
	origin: string
	details: JobInterface
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
	width: 16.5rem;
	justify-content: space-between;
	font-size: 1.8rem;
	font-weight: bold;
	color: hsl(217, 16%, 16%);
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

const JobCard = (props: JobCardInterface) => {
	const { origin, details } = props
	const router = useRouter()

	return (
		<CardContainer>
			<Locations>
				{details.pickup_location.province}
				<RightArrowLine />
				{details.dropoff_location.province}
			</Locations>
			<DetailRow>
				<DateAndTime>
					<UpArrowLine />
					20 ต.ค. 63 <span>|</span> 09:00 น.
				</DateAndTime>
				<DateAndTime>
					<DownArrowLine />
					20 ต.ค. 63 <span>|</span> 18:00 น.
				</DateAndTime>
			</DetailRow>
			<BottomDetails>
				<DetailColumn>
					<DetailRow>
						<Detail>
							<TruckIcon />
							{details.carrier_specification.truck.property.type}
						</Detail>
						<Detail>
							<ProductIcon />
							{details.product_type} {details.weight} ตัน
						</Detail>
					</DetailRow>
					<Detail>
						{
							origin === "jobs-page" ?
								<><NoteIcon /><span>{details.description}</span></>
								: <PersonIcon />
						}
						{/* นายคนขับ ขนส่ง */}
					</Detail>
				</DetailColumn>
				<CardActions>
					<span>{details.offer_price} บาท</span>
					<SecondaryButtonCustom onClick={() => router.push(`/jobs/details/${details.job_id}`)}>รายละเอียด</SecondaryButtonCustom>
				</CardActions>
			</BottomDetails>
		</CardContainer>
	)
}

export default JobCard
