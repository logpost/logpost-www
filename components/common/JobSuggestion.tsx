import React, { ChangeEvent, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Detail, DetailRow, FilterContainer, FilterLabel, FormActions, JobTitle, NumberOfJobs, PrimaryButton, SecondaryButton } from '../styles/GlobalComponents'
import { selectPositionOnMap } from '../utilities/googlemaps'
import { dateFormatter, timeFormatter } from '../utilities/helper'
import { DownArrowLine, ProductIcon, RightArrow, RightArrowLine, UpArrowLine, WeightIcon } from './Icons'
import InputComponent from './InputComponent'
import Modal from './Modal'

const MOCKUP_SUGGEST = {
	"summary": {
		"0": {
			"sum_cost": 3658.0492,
			"sum_offer": 10000,
			"profit": 6341.9508000000005,
			"distance_to_origin": 148957.3,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-02-20 01:00:00 +0000 UTC"
		},
		"1": {
			"sum_cost": 7381.8336,
			"sum_offer": 14000,
			"profit": 6618.1664,
			"distance_to_origin": 171131.4,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-01-26 05:00:00 +0000 UTC"
		},
		"2": {
			"sum_cost": 10873.890800000001,
			"sum_offer": 15200,
			"profit": 4326.109199999999,
			"distance_to_origin": 71855.9,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-01-26 00:00:00 +0000 UTC"
		},
		"3": {
			"sum_cost": 14627.0316,
			"sum_offer": 18060,
			"profit": 3432.9683999999997,
			"distance_to_origin": 189088.3,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-01-30 05:30:00 +0000 UTC"
		},
		"4": {
			"sum_cost": 18748.7436,
			"sum_offer": 23560,
			"profit": 4811.256399999998,
			"distance_to_origin": 0,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-03-26 11:00:00 +0000 UTC"
		}
	},
	"history": {
		"0": {
			"job_id": "602ccfee4b38d4000edc94e8",
			"carrier_id": "000000000000000000000000",
			"offer_price": 10000,
			"weight": 20,
			"duration": 18368,
			"waiting_time": 0,
			"distance": 340.454,
			"product_type": "ปุ๋ยนกแงว",
			"permission": "public",
			"pickup_date": "2021-02-18T23:00:00Z",
			"dropoff_date": "2021-02-20T01:00:00Z",
			"pickup_location": {
				"latitude": 13.6494163,
				"longitude": 99.8500984,
				"address": "Thai Tan ตำบล คลองตาคต",
				"province": "ราชบุรี",
				"district": "อำเภอโพธาราม",
				"zipcode": "70120"
			},
			"dropoff_location": {
				"latitude": 14.1161121,
				"longitude": 101.7732958,
				"address": "ตลาด ตำบล สำพันตา",
				"province": "ปราจีนบุรี",
				"district": "อำเภอนาดี",
				"zipcode": "25220"
			},
			"status": 100,
			"visited": true,
			"cost": 2723.632
		},
		"1": {
			"job_id": "600e7a786b1a50000edc95a0",
			"carrier_id": "000000000000000000000000",
			"offer_price": 4000,
			"weight": 12,
			"duration": 4438,
			"waiting_time": 0,
			"distance": 75.867,
			"product_type": "สินค้า",
			"permission": "public",
			"pickup_date": "2021-01-26T01:30:00Z",
			"dropoff_date": "2021-01-26T05:00:00Z",
			"pickup_location": {
				"latitude": 13.6767054,
				"longitude": 100.7224837,
				"address": "ถนนกิ่งแก้ว ตำบลราชาเทวะ",
				"province": "สมุทรปราการ",
				"district": "อำเภอบางพลี",
				"zipcode": ""
			},
			"dropoff_location": {
				"latitude": 13.970653,
				"longitude": 100.3414934,
				"address": "ถนน บางกรวย - กรุงเทพ ตำบลไทรน้อย",
				"province": "นนทบุรี",
				"district": "อำเภอไทรน้อย",
				"zipcode": "11150"
			},
			"status": 100,
			"visited": true,
			"cost": 606.936
		},
		"2": {
			"job_id": "600e87af6b1a50000edc969d",
			"carrier_id": "000000000000000000000000",
			"offer_price": 1200,
			"weight": 1,
			"duration": 3947,
			"waiting_time": 0,
			"distance": 78.668,
			"product_type": "สินค้าบรรจุลัง",
			"permission": "public",
			"pickup_date": "2021-01-25T21:00:00Z",
			"dropoff_date": "2021-01-26T00:00:00Z",
			"pickup_location": {
				"latitude": 14.200357,
				"longitude": 100.650232,
				"address": "ตำบล ลำไทร",
				"province": "พระนครศรีอยุธยา",
				"district": "อำเภอวังน้อย",
				"zipcode": "13170"
			},
			"dropoff_location": {
				"latitude": 13.6117233,
				"longitude": 100.7323332,
				"address": "",
				"province": "สมุทรปราการ",
				"district": "อำเภอบางพลี",
				"zipcode": ""
			},
			"status": 100,
			"visited": true,
			"cost": 629.344
		},
		"3": {
			"job_id": "600ec9493cae9c000e24dcca",
			"carrier_id": "000000000000000000000000",
			"offer_price": 2860,
			"weight": 22,
			"duration": 4723,
			"waiting_time": 0,
			"distance": 83.811,
			"product_type": "ขยะแห้ง",
			"permission": "public",
			"pickup_date": "2021-01-30T02:30:00Z",
			"dropoff_date": "2021-01-30T05:30:00Z",
			"pickup_location": {
				"latitude": 14.0786882,
				"longitude": 101.0259275,
				"address": "",
				"province": "นครนายก",
				"district": "อำเภอองครักษ์",
				"zipcode": ""
			},
			"dropoff_location": {
				"latitude": 14.6382852,
				"longitude": 101.1289634,
				"address": "ตำบลมิตรภาพ",
				"province": "สระบุรี",
				"district": "อำเภอมวกเหล็ก",
				"zipcode": "18180"
			},
			"status": 100,
			"visited": true,
			"cost": 670.488
		},
		"4": {
			"job_id": "600e6b5e63b812000e4532e4",
			"carrier_id": "000000000000000000000000",
			"offer_price": 5500,
			"weight": 5,
			"duration": 9870,
			"waiting_time": 0,
			"distance": 188.297,
			"product_type": "เหล็ก 10 เมตร",
			"permission": "public",
			"pickup_date": "2021-01-25T06:00:00Z",
			"dropoff_date": "2021-03-26T11:00:00Z",
            "pickup_location": {
				"latitude": 14.0786882,
				"longitude": 101.0259275,
				"address": "",
				"province": "นครนายก",
				"district": "อำเภอองครักษ์",
				"zipcode": ""
			},
			"dropoff_location": {
				"latitude": 14.6382852,
				"longitude": 101.1289634,
				"address": "ตำบลมิตรภาพ",
				"province": "สระบุรี",
				"district": "อำเภอมวกเหล็ก",
				"zipcode": "18180"
			},
			"status": 100,
			"visited": true,
			"cost": 670.488
        }
    }
}

const JobSuggestContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    
    > div {
        font-size: 1.6rem;
        margin: 0.8rem 2rem 1.2rem;

        &:last-child {
            margin: 0;
        }

        input, div {
            font-size: 1.6rem;
        }
        
        input {
            max-width: 30rem;
        }
    }
`

const SectionHeader = styled.div`
	font-weight: 600;
	color: hsl(212, 28%, 28%);
	display: flex;
	align-items: center;
	height: 2.5rem;

	div:first-child {
    	font-size: 2rem;
		padding-right: 1.8rem;
		position: absolute;
		background: white;
	}
`

const Line = styled.div`
	height: 0.2rem;
	border-radius: 10rem;
	background-color: hsl(212, 28%, 88%);
	width: 100%;
`

const ModalContent = styled.div`
	padding: 0 2rem;
	text-align: center;

	span {
		font-weight: 500;
	}

	> div:nth-child(3), ${FormActions} {
		margin-top: 1rem;
	}
`

const Map = styled.div`
	height: 60vh;
	width: 100%;
`

const Number = styled.div`
    min-width: 2.6rem;
    min-height: 2.6rem;
    width: 2.6rem;
    height: 2.6rem;
    font-size: 1.4rem;
    color: white;
    background: hsl(212, 28%, 28%);
    border-radius: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SuggestContainer = styled.div`
    display: grid;
`

const JobHeader = styled.div`
    display: flex;

    > div:last-child {
        margin-left: 1.4rem;
        font-weight: 700;
        color: hsl(16, 56%, 51%);
        border: 2px solid hsl(16, 56%, 51%);
        border-radius: 4px;
        padding: 0.4rem 1.2rem;
        width: fit-content;
        font-size: 1.4rem;
        white-space: nowrap;
    }

    ${JobTitle} {
        font-size: 1.6rem;
        margin-left: 1rem;

        svg {
            height: 18px;
            width: 18px;

            path {
                fill: hsl(212, 28%, 28%);
            }
        }
    }
`

const JobContent = styled.div`
    margin: 1rem 0;
    padding: 0 2rem;

    &:first-child {
        ${Number} {
            background: hsl(16, 56%, 51%);
        }
    }

    ${DetailRow} {
        margin-top: 1rem;
        margin-left: 4rem;
        max-width: 48rem;
        grid-template-columns: repeat(auto-fit, minmax(22rem,1fr));
        grid-gap: 1rem;
    }

    ${Detail} {
        white-space: nowrap;
        display: flex;
        align-items: center;

        span {
            margin: 0 1.2rem;
            color: hsl(212, 28%, 28%);
        }
        
        svg {
            margin-right: 1ch;
            min-height: 20px;
            min-width: 20px;
        }

        span:nth-child(2) {
            color: hsl(212, 28%, 28%);
        } 
    }
`

const SuggestJob = styled.div`

`

const Collapsible = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100vw;

    ${PrimaryButton} {
        background-color: hsl(212, 28%, 28%);
        color: white;
        padding: 0.6rem 2rem;
        border-radius: 0.6rem;
        font-weight: 600;
        height: fit-content;
    }
`

const Header = styled.button<{isOpen: boolean}>`
    font-size: 1.8rem;
    padding: 1.2rem 2rem;
    background: hsl(0, 0%, 95%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        transform: rotate(${props => props.isOpen ? "-90deg" : "90deg"});
    }
`

const PriceDetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 46rem;
    padding: 0 2rem;
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

const VerticalLine = styled.div`
    height: auto;
    background-color: hsl(212, 28%, 88%);
    width: 0.2rem;
    margin: 0 0.4rem;
`;

const HorizontalLine = styled.div`
	height: 0.2rem;
	border-radius: 10rem;
	background-color: hsl(212, 28%, 88%);
	width: 100%;
    margin-top: 1rem;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 2rem;
    align-items: center;
    justify-content: flex-end;

    > div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 1.4rem;
        margin-right: 2rem;

        > span:first-child {
            margin-bottom: 0.4rem;
        }
    }

    > button:not(:last-child) {
        margin-right: 1.6rem;
    }
`;

interface JobSuggestion {
    selectedJobID: string
}

const JobSuggestion = (props) => {
    const { selectedJobID } = props
    const [hop, setHop] = useState(2)
    const [toggleOriginModal, setToggleOriginModal] = useState(false)
    const [originLocation, setOriginLocation] = useState({
        latitude: undefined,
        longitude: undefined
    })
    const [tempLocation, setTempLocation] = useState<google.maps.places.PlaceResult | google.maps.GeocoderResult>()
    const [collapsible, setCollapsible] = useState({})

    const getJobSequence = (noSequence: number) => {
        const temp = Array(noSequence).fill(0).map((_, index) => {
            const job = MOCKUP_SUGGEST.history[index]
            return (
                <JobContent>
                    <JobHeader>
                        <Number>{index + 1}</Number>
                        <JobTitle>
                            <span>{job.pickup_location.province}</span>
                            <RightArrowLine />
                            <span>{job.dropoff_location.province}</span>
                        </JobTitle>
                        {index === 0 && <div>งานที่กำลังดู</div>}
                    </JobHeader>
                    <>
						<DetailRow>
                            <Detail>
                                <UpArrowLine /> ขึ้นสินค้า <span>{job.pickup_location.province}</span>
                            </Detail>
                            <Detail>
                                เวลา <span>{dateFormatter(job.pickup_date)} {timeFormatter(job.pickup_date)}</span>
                            </Detail>
                        </DetailRow>
                        <DetailRow>
                            <Detail>
                                <DownArrowLine /> ลงสินค้า <span>{job.dropoff_location.province}</span> 
                            </Detail>
                            <Detail>
                                เวลา <span> {dateFormatter(job.dropoff_date)} {timeFormatter(job.dropoff_date)}</span>
                            </Detail>
                        </DetailRow>
						<DetailRow>
							<Detail>
								<ProductIcon /> สินค้า <span>{job.product_type}</span>
							</Detail>
							<Detail>
								<WeightIcon /> น้ำหนัก <span>{job.weight}</span> ตัน
							</Detail>
						</DetailRow>
						{
							job.waiting_time > 0 && 
							<Detail>
								ขึ้นลงสินค้า <span>{job.waiting_time}</span> <span>ชั่วโมง</span>
							</Detail>
						}
						{
							job.description && 
							<Detail>
								คำอธิบาย <span>{job.description}</span>
							</Detail>
						}
					</>
                    <HorizontalLine />
                </JobContent>
            )
        })
        return (
            <SuggestJob>
                {temp}
            </SuggestJob>
        )
    }

    const initOriginMap = () => {
        setToggleOriginModal(true)
		const targetMap = document.getElementById("origin-map") as HTMLElement
		const placeInput = document.getElementById("origin-autocomplete") as HTMLInputElement
		selectPositionOnMap(targetMap, placeInput, setTempLocation, originLocation)
    }

    const handleSetOriginLocation = () => {
		setOriginLocation({
            latitude: tempLocation.geometry.location.lat(),
            longitude: tempLocation.geometry.location.lng()
        })
	    setToggleOriginModal(false)
	}

    useEffect(() => {
        const defaultMenu = {}
        Object.keys(MOCKUP_SUGGEST.history).forEach((index) => {
            defaultMenu[index] = false
        })
        setCollapsible(defaultMenu)
    }, [])

    return (
        <>
            <JobSuggestContainer>
                <SectionHeader>
                    <div>พิจารณางานเหล่านี้เพื่อเพิ่มกำไร!</div> <Line />
                </SectionHeader>
                <div onClick={initOriginMap}>
                    <InputComponent
                        labelEN="Origin"
                        labelTH="ตำแหน่งเริ่มต้น"
                        readOnly={true}
                        required={false}
                        value={(tempLocation?.formatted_address) || "เลือกจุดเริ่มต้น"}
                    />
                </div>
                <FilterContainer>
                    <FilterLabel>
                        จำนวนงานสูงสุด
                    </FilterLabel>
                    <InputComponent 
                        disableLabel={true}
                        type="number"
                        value={`${hop}`}
                        handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setHop(parseInt(e.target.value))}
                        classifier={"งาน"}
                    />
                </FilterContainer>
                <SuggestContainer>
                {
                    Object.keys(MOCKUP_SUGGEST.history).map((index) => {
                        const noOfJob = parseInt(index) + 1
                        const summarySequence = MOCKUP_SUGGEST.summary[index]
                        const endDate = new Date(summarySequence.end_date)
                        const startDate = new Date(summarySequence.start_date)
                        const diffDay = Math.ceil(Math.abs((endDate as any) - (startDate as any)) / (1000 * 60 * 60 * 24))
                        if (noOfJob !== 1) {
                            return (
                                <Collapsible>
                                    <Header isOpen={collapsible[index]} onClick={() => setCollapsible({...collapsible, [index]: !collapsible[index]})}>
                                        <span>งานต่อเนื่อง {noOfJob} งาน</span>
                                        <RightArrow />
                                    </Header>
                                    {collapsible[index] && <>
                                        {getJobSequence(noOfJob)}
                                        <PriceDetailsContainer>
                                            <PriceItem>
                                                ราคาเสนอ
                                                <div>
                                                    {summarySequence.sum_offer?.toLocaleString()} <span>บาท</span>
                                                </div>
                                            </PriceItem>
                                            <VerticalLine />
                                            <PriceItem>
                                                ต้นทุน <span>ประมาณ</span>
                                                <div>
                                                    {summarySequence.sum_cost?.toLocaleString()} <span>บาท</span>
                                                </div>
                                            </PriceItem>
                                            <VerticalLine />
                                            <PriceItem>
                                                กำไร
                                                <div>
                                                    {summarySequence.profit?.toLocaleString()}
                                                    <span> บาท</span>
                                                </div>
                                            </PriceItem>
                                        </PriceDetailsContainer>
                                        <ButtonContainer>
                                            <div>
                                                <span>เดินทางรวม {diffDay} วัน</span>
                                                <span>กำไรเพิ่มขึ้น {Math.floor(summarySequence.profit - MOCKUP_SUGGEST.summary[0].profit).toLocaleString()} บาท!</span>
                                            </div>
                                            <PrimaryButton>
                                                รับ {noOfJob} งานนี้
                                            </PrimaryButton>
                                        </ButtonContainer>
                                    </>}
                                </Collapsible>
                            )
                        }
                    })
                }
                </SuggestContainer>
            </JobSuggestContainer>
            <Modal toggle={toggleOriginModal} setToggle={setToggleOriginModal}>
                <ModalContent>
                    <span>เลือกสถานที่</span>
                    <InputComponent
                        name="origin-location"
                        id="origin-autocomplete"
                        disableLabel={true}
                    />
                    <Map id="origin-map" />
                    <FormActions>
                        <SecondaryButton onClick={() => setToggleOriginModal(false)}>ย้อนกลับ</SecondaryButton>
                        <PrimaryButton onClick={handleSetOriginLocation}>เลือกตำแหน่ง</PrimaryButton>
                    </FormActions>
                </ModalContent>
            </Modal>
        </>
    )
}

export default JobSuggestion
