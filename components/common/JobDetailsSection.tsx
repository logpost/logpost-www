import React from "react"
import styled from "styled-components"
import { DetailRow, Detail } from "../styles/GlobalComponents"
import { DownArrowLine, UpArrowLine } from "./Icons"
import { dateFormatter, timeFormatter } from "../utilities/helper"
import { JobDetails, JobDocument } from '../../entities/interface/job'
import { useRecoilValue } from 'recoil'
import { jobDetailsState } from '../../store/atoms/jobDetailsState'

const JobDetailsContainer = styled.div`
	> div {
		margin-top: 2rem;

		&:not(#space-between) {
			justify-content: flex-start;
		}

		&${Detail} {
			white-space: nowrap;

			span {
				white-space: pre-wrap;
			}

			&:first-child {
				margin-right: 1.2rem;
			}
		}
	}
`

const SectionHeader = styled.div`
	font-size: 2rem;
	font-weight: 600;
	color: hsl(212, 28%, 28%);
	display: flex;
	align-items: center;
	height: 2.5rem;

	div:first-child {
		padding-right: 1.8rem;
		position: absolute;
		background: white;
	}
`

const VerticalLine = styled.div`
    height: auto;
    background-color: hsl(212, 28%, 88%);
    width: 0.2rem;
    margin: 0 0.4rem;
`;

const Line = styled.div`
	height: 0.2rem;
	border-radius: 10rem;
	background-color: hsl(212, 28%, 88%);
	width: 100%;
`

const PickUpDeliverContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 0.6rem;
	border: solid 2px hsl(16, 56%, 51%);
	color: hsl(16, 56%, 51%);
	padding: 0.9rem 1.55rem;
	font-weight: 600;

	&:first-child {
		color: hsl(212, 28%, 28%);
		border-color: hsl(212, 28%, 28%);

		svg path {
			fill: hsl(212, 28%, 28%);
		}
	}

	span:not(:first-child) {
		margin-top: 0.6rem;
	}

	> span {
		font-size: 1.4rem;

		&:nth-child(2) {
			font-size: 1.8rem;
			font-weight: bold;
		}

		&:last-child {
			font-weight: 500;
		}
	}
`

const CarrierDetailsContainer = styled.div`
	margin-top: 2rem;
	padding: 0.8rem 1.6rem;
	background-color: hsl(211, 28%, 94%);

	> div:not(:first-child) {
		margin-top: 0.8rem;
	}
`

const PriceDetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`;

const PriceItem = styled.div`
	font-size: 1.6rem;
	color: hsl(218, 9%, 25%);
	font-weight: 500;

	> span {
		font-weight: 500;
		font-size: 1.2rem;
		color: hsl(0, 0%, 66%);
	}

	div {
		margin-top: 1.1rem;

		span {
			color: hsl(0, 0%, 51%);
		}
	}
`

const OfferPrice = styled.div`
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
`;

const FooterDetails = styled.div<{ rowLayout: boolean }>`
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
        flex-direction: ${(props) => (props.rowLayout ? "row" : "column")};
        justify-content: ${(props) =>
            props.rowLayout ? "space-between" : "flex-end"};
        align-items: flex-end;
        margin-left: ${(props) => (props.rowLayout ? 0 : "1rem")};
        width: ${(props) => (props.rowLayout ? "100%" : "auto")};

        > span {
            white-space: nowrap;
        }
    }
`;

const DisplayName = styled.span`
    max-width: 10rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;


const JobDetailsSection = (props) => {
	const { 
		isShowJobDetails = true,
		isShowCarrierDetails = true,
		isShowAutoPrice = true,
		isShowFooterDetails = true
	} = props
	const details = useRecoilValue<JobDocument>(jobDetailsState)

	return (
		<>
			{ isShowJobDetails && 
				<JobDetailsContainer>
					<SectionHeader>
						<div>รายละเอียดงาน</div> <Line />
					</SectionHeader>
					<>
						<DetailRow id="space-between">
							<PickUpDeliverContainer>
								<span>
									ขึ้นสินค้า <UpArrowLine />
								</span>
								<span>{details.pickup_location.province}</span>
								<span>{dateFormatter(details.pickup_date)} {timeFormatter(details.pickup_date)}</span>
							</PickUpDeliverContainer>
							<PickUpDeliverContainer>
								<span>
									ลงสินค้า <DownArrowLine />
								</span>
								<span>{details.dropoff_location.province}</span>
								<span>{dateFormatter(details.dropoff_date)} {timeFormatter(details.dropoff_date)}</span>
							</PickUpDeliverContainer>
						</DetailRow>
						<DetailRow>
							<Detail>
								สินค้า <span>{details.product_type}</span>
							</Detail>
							<Detail>
								น้ำหนัก <span>{details.weight}</span> <span>ตัน</span>
							</Detail>
						</DetailRow>
						{
							details.waiting_time > 0 && 
							<Detail>
								ขึ้นลงสินค้า <span>{details.waiting_time}</span> <span>ชั่วโมง</span>
							</Detail>
						}
						{
							details.description && 
							<Detail>
								คำอธิบาย <span>{details.description}</span>
							</Detail>
						}
					</>
					<SectionHeader>
						<div>รายละเอียดรถบรรทุก</div> <Line />
					</SectionHeader>
					<>
						<Detail>
							ประเภทรถ <span>{details.carrier_specification.truck.property.type} {details.carrier_specification.truck.property.option} {details.carrier_specification.truck.property.chassis > 0 &&  ` ${details.carrier_specification.truck.property.chassis} เพลา`} </span>
						</Detail>
						<Detail>
							อายุไม่เกิน <span>{details.carrier_specification.truck.age}</span> <span>ปี</span>
						</Detail>
						<Detail>
							พนักงานขับรถใบขับขี่ <span>{details.carrier_specification.driver.driver_license_type}</span>
						</Detail>
					</>
				</JobDetailsContainer>
			}
			{ isShowCarrierDetails &&
				<CarrierDetailsContainer>
					<Detail>
						ขนส่งโดย <span>{details.carrier_display_name}</span>
					</Detail>
					<Detail>
						พนักงานขับรถ <span>{details.driver_name}</span>
					</Detail>
					<Detail>
						ทะเบียนรถ <span>{details.license_number}</span>
					</Detail>
				</CarrierDetailsContainer>
			}
			{isShowAutoPrice && 
				<PriceDetailsContainer>
					<PriceItem>
						ราคาเสนอ
						<div>
							{details.offer_price?.toLocaleString()} <span>บาท</span>
						</div>
					</PriceItem>
					<VerticalLine />
					<PriceItem>
						ต้นทุน <span>ประมาณ</span>
						<div>
							{details.auto_price?.toLocaleString()} <span>บาท</span>
						</div>
					</PriceItem>
					<VerticalLine />
					<PriceItem>
						กำไร
						<div>
							{ (details.offer_price - details.auto_price).toLocaleString() }
							<span> บาท</span>
						</div>
					</PriceItem>
				</PriceDetailsContainer>
			}
			{
				isShowFooterDetails &&
				<FooterDetails rowLayout={isShowAutoPrice}>
					{
						(!isShowAutoPrice) &&
						<OfferPrice>{details.offer_price?.toLocaleString()} บาท</OfferPrice>
					}
					<span>
						<Detail>
							โดย <DisplayName>{details.shipper_display_name}</DisplayName>
						</Detail>
						<span>{dateFormatter(details.dropoff_date)} {timeFormatter(details.dropoff_date)}</span>
					</span>
				</FooterDetails>
			}
		</>
	)
}

export default JobDetailsSection
